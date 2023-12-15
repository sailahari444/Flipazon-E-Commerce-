package com.ecommerce.profile.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecommerce.profile.Entity.Address;
import com.ecommerce.profile.Entity.Profile;
import com.ecommerce.profile.Exception.ResourceNotFoundException;
import com.ecommerce.profile.Repository.AddressRepository;
import com.ecommerce.profile.Repository.ProfileRepository;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepository addressRepository;

	@Autowired
	private ProfileRepository profileRepository;

	@Override
	public List<Address> getAllAddressByProfileId(String profileId) throws ResourceNotFoundException {

		Optional<Profile> findProfileId = profileRepository.findByProfileId(profileId);
		if (findProfileId.isPresent()) {
			return addressRepository.getAllAddressByProfileId(profileId);
		} else {
			throw new ResourceNotFoundException("Profile with profileId: " + profileId + "  Not Found.");
		}
	}

	@Override
	public void deleteAddress( String addressId) throws ResourceNotFoundException {
		addressRepository.deleteById(addressId);
	}

	@Override
	public Address updateAddress(Address addressObj) {
		return addressRepository.save(addressObj);
	}

	@Override
	public Address saveAddressByProfileId( Address address) throws ResourceNotFoundException {
		Address addressObj = new Address();

		addressObj.setHouseNo(address.getHouseNo());
		addressObj.setStreet(address.getStreet());
		addressObj.setLocality(address.getLocality());
		addressObj.setCity(address.getCity());
		addressObj.setState(address.getState());
		addressObj.setPincode(address.getPincode());
		addressObj.setProfileId(address.getProfileId());

		Optional<Profile> findProfileId = profileRepository.findByProfileId(address.getProfileId());
		if (findProfileId.isPresent()) {
			return addressRepository.save(addressObj);
		} else {
			throw new ResourceNotFoundException("Profile with profileId: " + address.getProfileId()
					+ " Not Found and therefore address cannot be inserted into the database.");
		}

	}

	@Override
	public Optional<Address> getAddressById(String addressId) {
		return addressRepository.findById(addressId);
	}
}
