package com.ecommerce.wishlist.repository;

import com.ecommerce.wishlist.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, String> {

    Optional<Wishlist> findByProfileIdAndWishlistName(String profileId, String wishlistName);

    List<Wishlist> findByProfileId(String profileId);
}
