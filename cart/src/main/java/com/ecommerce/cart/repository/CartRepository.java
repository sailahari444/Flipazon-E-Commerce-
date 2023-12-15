package com.ecommerce.cart.repository;


import com.ecommerce.cart.entity.CartItem;
import com.ecommerce.cart.entity.CartItemId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CartRepository extends JpaRepository<CartItem, String> {

    CartItem findByProfileId(String profileId);
//    @Query(value = "SELECT * FROM cart_item WHERE profile_id = ?1",nativeQuery = true)
//    List<CartItem> findCartItemsByProfileId(Long profileId);

    //    @Modifying
//    @Transactional
//    @Query(value = "DELETE FROM cart_item WHERE profile_id = ?1",nativeQuery = true)
//    void deleteCartItemsByProfileId(Long profileId);
    public void deleteByProfileId(String profileId);

  
}