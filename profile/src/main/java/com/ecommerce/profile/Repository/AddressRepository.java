package com.ecommerce.profile.Repository;

import java.util.List;
import java.util.Optional;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.ecommerce.profile.Entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, String> {

	@Query(value = "SELECT * FROM address where profile_id = ?1", nativeQuery = true)
	public List<Address> getAllAddressByProfileId(String profileId);

	@SQLDelete(sql = "DELETE FROM address where profile_id = ?1")
	public void deleteAllAddressByProfileId(String profileId);

	@Query(value = "SELECT * FROM address WHERE profile_id = ?1 AND address_id = ?2", nativeQuery = true)
	public Optional<Address> findAddressByProfileIdAndAddressId(String productId, String addressId);

}
