package com.ecommerce.profile.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ecommerce.profile.Entity.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {

	public Optional<Profile> findByProfileId(String profileId);

	public Optional<Profile> findByUserEmail(String userEmail);

	public Optional<Profile> findByUserMobNo(String userMobNo);
}
