package com.ecommerce.profile.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.ecommerce.profile.Exception.EmailAlreadyExistsException;
import com.ecommerce.profile.Exception.InvalidOldPasswordException;
import com.ecommerce.profile.Exception.MobileNumberAlreadyExistsException;

import com.ecommerce.profile.dto.AuthRequest;
import com.ecommerce.profile.dto.ChangePasswordDto;
import feign.FeignException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.profile.Controller.ProfileController;
import com.ecommerce.profile.Entity.Address;
import com.ecommerce.profile.Entity.Profile;
import com.ecommerce.profile.Exception.ResourceNotFoundException;
import com.ecommerce.profile.Repository.AddressRepository;
import com.ecommerce.profile.Repository.ProfileRepository;
import com.ecommerce.profile.dto.Profiledto;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class ProfileServiceImpl implements ProfileService {
    private static final Logger log = LoggerFactory.getLogger(ProfileController.class);
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private AuthClient authClient;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Profile> listProfiles() {
        return profileRepository.findAll();
    }

    @Override
    public Map<String, Object> insertProfile(Profiledto profiledto) {

        profileRepository.findByUserMobNo(profiledto.getUserMobNo()).ifPresent((u) -> {
            throw new MobileNumberAlreadyExistsException(
                    "Profile with this mobile number already exists. Please use a different mobile number.");
        });
        profileRepository.findByUserEmail(profiledto.getUserEmail()).ifPresent((u) -> {
            throw new EmailAlreadyExistsException(
                    "Profile with this Email Id already exists. Please use a different Email Id.");
        });
        Profile profileObj = new Profile();
        profileObj.setUserName(profiledto.getUserName());
        profileObj.setUserGender(profiledto.getUserGender());
        profileObj.setUserEmail(profiledto.getUserEmail());
        profileObj.setUserMobNo(profiledto.getUserMobNo());
        profileObj.setUserPassword(passwordEncoder.encode(profiledto.getUserPassword()));
        Profile savedProfile = profileRepository.save(profileObj);

        String token = authClient.getToken(new AuthRequest(profiledto.getUserEmail(), profiledto.getUserPassword()));
        Map<String, Object> tokenAndProfile = new HashMap<>();
        tokenAndProfile.put("profile", savedProfile);
        tokenAndProfile.put("token", token);

        return tokenAndProfile;
    }

    @Override
    public Map<String, Object> login(Profiledto profiledto) throws ResourceNotFoundException, Exception {
        String email = profiledto.getUserEmail();
        Profile foundProfile = profileRepository.findByUserEmail(email).orElseThrow(() -> new ResourceNotFoundException("Unable to find profile with given email"));
        Map<String, Object> tokenAndProfile = new HashMap<>();
        try {
            String token = authClient.getToken(new AuthRequest(email, profiledto.getUserPassword()));
            tokenAndProfile.put("token", token);
            tokenAndProfile.put("profile", foundProfile);
        } catch (FeignException exc) {
            throw new ResourceNotFoundException("No profile found with provided credentials. Please check email-id and password.");
        }

        return tokenAndProfile;
    }

    @Override
    public void changePassword(ChangePasswordDto userCredentials) throws ResourceNotFoundException, InvalidOldPasswordException {
        String email = userCredentials.getEmail();
        String oldPassword = userCredentials.getOldPassword();
        Profile existingProfile = profileRepository.findByUserEmail(email).orElseThrow(() -> new ResourceNotFoundException("No user found with the provided email."));
        if (passwordEncoder.matches(oldPassword, existingProfile.getUserPassword())) {
            String newPassword = userCredentials.getNewPassword();
            if (!newPassword.isBlank()) {
                existingProfile.setUserPassword(passwordEncoder.encode(newPassword));
                profileRepository.save(existingProfile);
            }
        } else {
            throw new InvalidOldPasswordException("Unable to change password. Entered old password is invalid!!!");
        }
    }

    @Override
    public Profiledto getProfileById(String profileId) throws ResourceNotFoundException {

        Optional<Profile> profileObj = profileRepository.findByProfileId(profileId);
        List<Address> addressObj = addressRepository.getAllAddressByProfileId(profileId);

        if (profileObj.isPresent()) {
            Profiledto profiledto = new Profiledto();
            profiledto.setProfileId(profileObj.get().getProfileId());
            profiledto.setAddress(addressObj);
            profiledto.setUserEmail(profileObj.get().getUserEmail());
            profiledto.setUserGender(profileObj.get().getUserGender());
            profiledto.setUserMobNo(profileObj.get().getUserMobNo());
            profiledto.setUserName(profileObj.get().getUserName());
            return profiledto;
        } else {
            log.warn("Profile with profileId:{} Not Found", profileId);
            throw new ResourceNotFoundException("Profile with ProfileId: " + profileId + " Not Found");
        }
    }

    @Override
    public Profiledto getProfileByUserEmailId(String userEmail) throws ResourceNotFoundException {
        Optional<Profile> profileObj = profileRepository.findByUserEmail(userEmail);
        List<Address> addressObj = addressRepository.getAllAddressByProfileId(profileObj.get().getProfileId());

        if (profileObj.isPresent()) {
            Profiledto profiledto = new Profiledto();
            profiledto.setProfileId(profileObj.get().getProfileId());
            profiledto.setAddress(addressObj);
            profiledto.setUserEmail(profileObj.get().getUserEmail());
            profiledto.setUserGender(profileObj.get().getUserGender());
            profiledto.setUserMobNo(profileObj.get().getUserMobNo());
            profiledto.setUserName(profileObj.get().getUserName());
            return profiledto;
        } else {
            log.warn("Profile with Email Id:{} Not Found", userEmail);
            throw new ResourceNotFoundException("Profile with Email Id: " + userEmail + " Not Found");
        }
    }

    @Transactional
    @Override
    public void deleteProfileById(String profileId) throws ResourceNotFoundException {
        Optional<Profile> foundProfile = profileRepository.findByProfileId(profileId);
        if (foundProfile.isPresent()) {
            addressRepository.deleteAllAddressByProfileId(profileId);
            profileRepository.deleteById(profileId);
        } else {
            profileRepository.findByProfileId(profileId).orElseThrow(() -> {
                log.warn("Profile with profileId:{} is not available and cannot be deleted ", profileId);
                return new ResourceNotFoundException(
                        "Profile with ProfileId: " + profileId + " is not available and cannot be deleted. ");
            });
        }
    }

    @Override
    public Profile updateProfileById(Profile profile) throws ResourceNotFoundException {
        if (profile.getUserMobNo() != null && !profile.getUserMobNo().isBlank()) {
            profileRepository.findByUserMobNo(profile.getUserMobNo()).ifPresent((u) -> {
                if (u.getUserMobNo().equals(profile.getUserMobNo()) && !u.getProfileId().equals(profile.getProfileId())) {
                    throw new MobileNumberAlreadyExistsException(
                            "Profile with this mobile number already exists. Please use a different mobile number.");
                }
            });
        }
        if (profile.getUserEmail() != null && !profile.getUserEmail().isBlank()) {
            Optional<Profile> findprofile = profileRepository.findByUserEmail(profile.getUserEmail());
            if (findprofile.isPresent()) {
                Profile u = findprofile.get();
                if (u.getUserEmail().equals(profile.getUserEmail()) && !u.getProfileId().equals(profile.getProfileId())) {
                    throw new EmailAlreadyExistsException("Profile with EmailId " + profile.getUserEmail()
                            + " already exists, therefore cannot update this profile");
                }

            }
        }

        boolean blankEmail = profile.getUserEmail().isBlank();
        boolean blankMobileNo = profile.getUserMobNo().isBlank();
        boolean blankUserGender = profile.getUserGender().isBlank();
        boolean blankUsername = profile.getUserName().isBlank();
        Profile existingProfile = profileRepository.findById(profile.getProfileId()).get();

        if (!blankEmail) {
            existingProfile.setUserEmail(profile.getUserEmail());
        }
        if (!blankMobileNo) {
            existingProfile.setUserMobNo(profile.getUserMobNo());
        }
        if (!blankUsername) {
            existingProfile.setUserName(profile.getUserName());
        }
        if (!blankUserGender) {
            existingProfile.setUserGender(profile.getUserGender());
        }

        return profileRepository.save(existingProfile);
    }

}