package com.ecommerce.profile.Controller;

import java.util.List;
import java.util.Map;

import com.ecommerce.profile.dto.ChangePasswordDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ecommerce.profile.Entity.Profile;
import com.ecommerce.profile.Exception.ResourceNotFoundException;
import com.ecommerce.profile.Repository.ProfileRepository;
import com.ecommerce.profile.Service.ProfileService;
import com.ecommerce.profile.dto.Profiledto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "CRUD REST APIs for Profile Service", description = "Create Profile, Update Profile, Get Profile, Get All Profiles, Delete Profile")
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

	@Autowired
	private ProfileService profileService;

	private static final Logger log = LoggerFactory.getLogger(ProfileController.class);

	/**
	 * This method is used to save a Profile details into the database.
	 * 
	 * 
	 * @param profiledto contains the profile details like username, email, gender, etc...
	 * @return the saved profile details along with a JWT token for that profile
	 */
	@Operation(summary = "Create Profile REST API", description = "Create Profile Endpoint to save a new profile in database.")
	@ApiResponse(responseCode = "201", description = "HTTP Status 201 CREATED")
	@PostMapping("/insert")
	public ResponseEntity<Map<String,Object>> saveProfile(@RequestBody Profiledto profiledto) {
		Map<String,Object> savedprofileEntity = profileService.insertProfile(profiledto);
		log.info("POST  /api/profile/insert  Inserting a new profile into the database with profileName: {}",
				profiledto.getUserName());
		return new ResponseEntity<>(savedprofileEntity, HttpStatus.CREATED);
	}

	/**
	 *
	 * @param profiledto contains login credentials, i.e., email and password
	 * @return the logged in profile details along with a JWT token for that profile
	 * @throws Exception
	 */
	@Operation(summary = "Login REST API", description = "Login Endpoint used by an existing user to login.")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@PostMapping("/login")
	public ResponseEntity<Map<String,Object>> login(@RequestBody Profiledto profiledto) throws Exception {
		Map<String,Object> foundProfileEntity = profileService.login(profiledto);
		log.info("POST  /api/profile/login  Getting token and profile details for user with email: {}",
				profiledto.getUserEmail());
		return new ResponseEntity<>(foundProfileEntity, HttpStatus.OK);
	}

	/**
	 *
	 * @param userCredentials contains the email, old password and new password for password change
	 * @return a string indicating that the password was changed successfully
	 * @throws ResourceNotFoundException
	 */
	@Operation(summary = "Change Password REST API", description = "Change Password Endpoint used by an existing user to change the password.")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@PutMapping("/changePassword")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto userCredentials) throws ResourceNotFoundException {
		profileService.changePassword(userCredentials);

		return new ResponseEntity<>("Password changed successfully!",HttpStatus.OK);
	}

	/**
	 * This method is used to retrieve the list of profiles.
	 * 
	 * @return the list of profiles
	 */
//	@Operation(summary = "Get Profile REST API", description = "Get Profile Endpoint is used to get all Profiles from database.")
//	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
//	@GetMapping("/list")
//	public ResponseEntity<List<Profile>> getAllProfiles() {
//		List<Profile> profile = profileService.listProfiles();
//		log.info("GET  /api/profile/list  Getting the list of profiles");
//		return new ResponseEntity<>(profile, HttpStatus.OK);
//	}

	/**
	 * This method is used to retrieve the detail of a specific profile along with
	 * it's addresses using ProfileId.
	 * 
	 * @param profileId profileId whose profile details has to be fetched.
	 * @return the profile details
	 * @throws ResourceNotFoundException This Exception is raised when specified
	 *                                   profileId is not present.
	 */
	@Operation(summary = "Get ProfileByProfileId REST API", description = "Get Profile Endpoint is used to get the details of a single profile along with it's addresses from database using profileId")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@ApiResponse(responseCode = "404", description = "HTTP Status 404 Not Found")
	@GetMapping("/getById/{profileId}")
	public ResponseEntity<Profiledto> getProfileWithAddressesByProfileId(@PathVariable("profileId") String profileId)
			throws ResourceNotFoundException {
		log.info("GET  /api/profile/getById/{}   getting the details of a profile with profileId:{}", profileId,
				profileId);

		Profiledto profiledto = profileService.getProfileById(profileId);
		return new ResponseEntity<>(profiledto, HttpStatus.OK);
	}

	/**
	 * This method is used to retrieve the detail of a specific profile along with
	 * it's addresses using UserEmail.
	 * 
	 * @param userEmail User Email Id whose profile details has to be fetched.
	 * @return the profile details
	 * @throws ResourceNotFoundException This Exception is raised when specified
	 *                                   User Email Id is not present.
	 */
	@Operation(summary = "Get ProfileByUserEmail REST API", description = "Get Profile Endpoint is used to get the details of a single profile along with it's addresses from database using UserEmail")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@ApiResponse(responseCode = "404", description = "HTTP Status 404 Not Found")
	@GetMapping("/getProfileByUserEmailId/{userEmail}")
	public ResponseEntity<Profiledto> getProfileByUserEmailId(@PathVariable("userEmail") String userEmail)
			throws ResourceNotFoundException {
		log.info("GET  /api/profile/getProfileByUserEmailId/{}   getting the details of a profile with EmailId:{}",
				userEmail, userEmail);

		Profiledto profiledto = profileService.getProfileByUserEmailId(userEmail);
		return new ResponseEntity<>(profiledto, HttpStatus.OK);
	}

	/**
	 * This method is used to update the detail of a specific profile using
	 * ProfileId.
	 * 
	 * @param profileId      profileId whose profile details has to be updated.
	 * @param profiledetails
	 * @return
	 * @throws ResourceNotFoundException This Exception is raised when specified
	 *                                   ProfileId is not present.
	 */
	@Operation(summary = "Update Profile REST API", description = "Update Profile REST API is used to update an existing profile in database")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@ApiResponse(responseCode = "404", description = "HTTP Status 404 Not Found")
	@PutMapping("/updateById")
	public ResponseEntity<Profile> updateProfileById(@RequestBody Profile profiledetails)
			throws ResourceNotFoundException {

		final Profile updatedProfile = profileService.updateProfileById(profiledetails);
		log.info("UPDATE  /api/profile/updateById  Updating a profile with profileId:{}",
				profiledetails.getProfileId());
		return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
	}

	/**
	 * This method is used to delete a specific profile along with it's address.
	 * 
	 * @param profileId profileId whose profile has to be deleted.
	 * @return String
	 * @throws ResourceNotFoundException This Exception is raised when specified
	 *                                   ProfileId is not present.
	 */
	@Operation(summary = "Delete Profile REST API", description = "This is used to delete a single profile from database")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@ApiResponse(responseCode = "404", description = "HTTP Status 404 Not Found")
	@DeleteMapping("/deleteById/{profileId}")
	public ResponseEntity<String> deleteProfileById(@PathVariable("profileId") String profileId) throws Exception {

		profileService.deleteProfileById(profileId);
		log.info("DELETE  /api/profile/deleteById/{}  deleting a profile with profileId:{}", profileId, profileId);
		return new ResponseEntity<String>("Profile deleted successfully!.", HttpStatus.OK);
	}

}
