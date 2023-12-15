package com.ecommerce.profile.Controller;

import java.util.List;
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
import com.ecommerce.profile.Entity.Address;
import com.ecommerce.profile.Exception.ResourceNotFoundException;
import com.ecommerce.profile.Service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "CRUD REST APIs for Address Service", description = "Create multiple Addresses for a Single Profile, Get multiple addresses, Update a Specific Address of a profile,  Delete a specific address of a profile")
@RestController
@RequestMapping("/api/address")
public class AddressController {

	@Autowired
	private AddressService addressService;

	private static final Logger log = LoggerFactory.getLogger(AddressController.class);

	/**
	 * This method is used to save the fields of Address Entity by a ProfileId.
	 * 
	 * @param profileId profileId of the profile whose address has to be saved.
	 * @param address   address to be saved in it's specific profile.
	 * @return the saved address.
	 * @throws ResourceNotFoundException
	 */
	@Operation(summary = "Create Address REST API", description = "Create Address Endpoint to save a specific address of a profile by a ProfileId.")
	@ApiResponse(responseCode = "201", description = "HTTP Status 201 CREATED")
	@PostMapping("/addAddress")
	public ResponseEntity<Address> saveAddressByProfileId(@RequestBody Address address)
			throws NullPointerException, ResourceNotFoundException {
		Address savedAddress = addressService.saveAddressByProfileId(address);
		log.info("POST    /api/address/addAddress  saving address to a profile with profileId: {} ",
				address.getProfileId());
		return new ResponseEntity<>(savedAddress, HttpStatus.CREATED);
	}

	/**
	 * One profile can have multiple addresses. This method is used to retrieve the
	 * list of addresses specific to a profile using profileId.
	 * 
	 * @param profileId profileId whose addresses has to be fetched.
	 * @return list of address.
	 * @throws ResourceNotFoundException
	 */
	@Operation(summary = "Get Address REST API", description = "Get Address REST API Endpoint to get all the addresses of a specific Profile by a ProfileId.")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@GetMapping("/getAllAddressByProfileId/{profileId}")
	public ResponseEntity<List<Address>> getAllAddressByProfileId(@PathVariable("profileId") String profileId)
			throws ResourceNotFoundException {
		List<Address> savedAddress = addressService.getAllAddressByProfileId(profileId);
		log.info("GET /address/getAllAddressByProfileId/{} gets all addresses of Profile with ProfileId: {}", profileId,
				profileId);
		return new ResponseEntity<>(savedAddress, HttpStatus.OK);
	}

	/**
	 * This method is used to update the details of a specific address using
	 * profileId and addressId in the database.
	 * 
	 * @param profileId      profileId of a Profile whose address need to be
	 *                       updated.
	 * @param addressId      addressId of a Profile whose address need to be
	 *                       updated.
	 * @param address address is a reference to the updated data.
	 * @return the updated data.
	 * @throws ResourceNotFoundException ResourceNotFound Exception is raised when
	 *                                   the specified profileId and addressId is
	 *                                   not present.
	 */
	@Operation(summary = "Update Address REST API", description = "Update Address REST API Endpoint is used to update a specific address using profileId and addressId in the database.")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@PutMapping("/updateAddress")
	public ResponseEntity<Address> updateAddress(@RequestBody Address address) throws ResourceNotFoundException {

		Address addressObj = addressService.getAddressById(address.getAddressId()).orElseThrow(() -> {
			log.warn("Profile with profileId:{} is not available and address cannot be updated ",
					address.getProfileId());
			return new ResourceNotFoundException(
					"Profile with ProfileId: " + address.getProfileId() + " and AddressId: "
							+ address.getAddressId() + " not found and therefore address cannot be updated.");
		});
		addressObj.setHouseNo(address.getHouseNo());
		addressObj.setStreet(address.getStreet());
		addressObj.setLocality(address.getLocality());
		addressObj.setCity(address.getCity());
		addressObj.setState(address.getState());
		addressObj.setPincode(address.getPincode());

		final Address updatedAddress = addressService.updateAddress(addressObj);
		log.info("PUT /address/updateAddress  updating address of a profile with profileId: {} and addressId: {}",
				address.getProfileId(), address.getAddressId());
		return new ResponseEntity<>(updatedAddress, HttpStatus.OK);
	}

	/**
	 * This method is used to delete a specific address using profileId and
	 * addressId.
	 * 
	 * @param profileId profileId of a Profile whose address need to be deleted.
	 * @param addressId addressId of a Profile whose address need to be deleted.
	 * 
	 * @return
	 * @throws ResourceNotFoundException ResourceNotFound Exception is raised when
	 *                                   the specified profileId and addressId is
	 *                                   not present.
	 * 
	 */
	@Operation(summary = "Delete Address REST API", description = "Delete Address REST API Endpoint is used to delete specific address from database.")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@DeleteMapping("/deleteAddress/{profileId}/{addressId}")
	public ResponseEntity<String> deleteAddress(@PathVariable("profileId") String profileId,
			@PathVariable("addressId") String addressId) throws ResourceNotFoundException {

		addressService.getAddressById(addressId).orElseThrow(() -> {
			log.warn("Profile with profileId:{} is not available and address cannot be deleted ", profileId);
			return new ResourceNotFoundException("Profile with ProfileId: " + profileId + " and AddressId: " + addressId
					+ " not found and therefore address cannot be deleted. ");
		});

		addressService.deleteAddress( addressId);
		log.info(
				"DELETE /address/deleteAddress/{}/{}  deleting address of a profile with profileId: {} and addressId: {}",
				profileId, addressId, profileId, addressId);
		return new ResponseEntity<String>("Address deleted successfully.!", HttpStatus.OK);
	}

	/**
	 * This method is used to retrieve all the details of a specific address using
	 * addressId.
	 * 
	 * @param addressId
	 * @return the address.
	 * @throws ResourceNotFoundException ResourceNotFound Exception is raised when
	 *                                   the specified profileId and addressId is
	 *                                   not present.
	 * 
	 */
	@Operation(summary = "Get Address REST API", description = "Get Address REST API Endpoint to get all the details of a specific address by an AddressId.")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@GetMapping("/getById/{addressId}")
	public ResponseEntity<Address> getAddressByAddressId(@PathVariable("addressId") String addressId)
			throws ResourceNotFoundException {
		log.info("GET   /api/address/getById/{}  getting details of address with AddressId: {}", addressId, addressId);

		addressService.getAddressById(addressId).orElseThrow(() -> {
			log.warn("Address with AddressId:{} Not Found. ", addressId);
			return new ResourceNotFoundException("Address with AddressId: " + addressId + " Not Found. ");
		});

		return addressService.getAddressById(addressId).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

}
