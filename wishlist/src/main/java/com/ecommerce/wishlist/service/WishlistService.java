package com.ecommerce.wishlist.service;

import com.ecommerce.wishlist.dto.DetailedWishlistDto;
import com.ecommerce.wishlist.dto.WishlistDto;

import java.util.Map;

public interface WishlistService {

    DetailedWishlistDto createNewWishlist(WishlistDto wishlistDto);
    String addProductToWishlist(WishlistDto wishlistDto);
    DetailedWishlistDto getWishlistByWishlistId(String wishlistId);
    Map<String,String> getWishlistIdsAndNamesByProfileId(String profileId);
    String deleteProductFromWishlist(WishlistDto wishlistDto);
    String deleteWishlistByWishlistId(String wishlistId);
}
