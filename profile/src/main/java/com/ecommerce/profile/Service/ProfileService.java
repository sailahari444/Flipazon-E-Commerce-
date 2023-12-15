package com.ecommerce.profile.Service;

import java.util.List;
import java.util.Map;

import com.ecommerce.profile.Entity.Profile;
import com.ecommerce.profile.Exception.InvalidOldPasswordException;
import com.ecommerce.profile.Exception.ResourceNotFoundException;
import com.ecommerce.profile.dto.ChangePasswordDto;
import com.ecommerce.profile.dto.Profiledto;

public interface ProfileService {

	public List<Profile> listProfiles();

	public Map<String,Object> insertProfile(Profiledto profiledto);

	public Map<String,Object> login(Profiledto profiledto) throws ResourceNotFoundException, Exception;

	public void changePassword(ChangePasswordDto userCredentials) throws ResourceNotFoundException, InvalidOldPasswordException;

	public Profiledto getProfileById(String profileId) throws ResourceNotFoundException;

	public void deleteProfileById(String profileId) throws ResourceNotFoundException;

	public Profile updateProfileById(Profile profiledetails) throws ResourceNotFoundException;

	public Profiledto getProfileByUserEmailId(String userEmail) throws ResourceNotFoundException;


}
