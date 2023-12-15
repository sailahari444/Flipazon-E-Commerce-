package com.ecommerce.authservice.repository;

import com.ecommerce.authservice.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserCredentialRepository  extends JpaRepository<Profile,String> {

    Optional<Profile> findByUserEmail(String userEmail);
}
