package com.ecommerce.profile.Service;

import java.util.List;
import java.util.Optional;

import com.ecommerce.profile.Entity.Address;
import com.ecommerce.profile.Exception.ResourceNotFoundException;

public interface AddressService {

	public Address saveAddressByProfileId( Address address) throws ResourceNotFoundException;

	public Optional<Address> getAddressById(String addressId);

	public List<Address> getAllAddressByProfileId(String profileId) throws ResourceNotFoundException;

	public void deleteAddress(String addressId) throws ResourceNotFoundException;

	public Address updateAddress(Address addressObj);

}
