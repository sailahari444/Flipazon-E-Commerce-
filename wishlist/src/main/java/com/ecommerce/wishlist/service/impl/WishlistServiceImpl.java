package com.ecommerce.wishlist.service.impl;

import com.ecommerce.wishlist.dto.DetailedWishlistDto;
import com.ecommerce.wishlist.dto.WishlistDto;
import com.ecommerce.wishlist.entity.Product;
import com.ecommerce.wishlist.entity.Wishlist;
import com.ecommerce.wishlist.exception.WishlistAlreadyExistsException;
import com.ecommerce.wishlist.repository.WishlistRepository;
import com.ecommerce.wishlist.service.ProductClient;
import com.ecommerce.wishlist.service.WishlistService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WishlistServiceImpl implements WishlistService {

    private WishlistRepository repository;
    private ProductClient productClient;

    private static final Logger LOGGER= LoggerFactory.getLogger(WishlistServiceImpl.class);

    @Override
    public DetailedWishlistDto createNewWishlist(WishlistDto wishlistDto) {
        if(repository.findByProfileIdAndWishlistName(wishlistDto.getProfileId(),wishlistDto.getWishlistName().trim()).isPresent()){
            throw new WishlistAlreadyExistsException("A wishlist with this name already exists...");
        }

        Wishlist wl = new Wishlist();
        wl.setProfileId(wishlistDto.getProfileId());
        wl.setWishlistName(wishlistDto.getWishlistName());
        wl.setProducts(new ArrayList<>());

        Wishlist savedWishlist = repository.save(wl);

        String methodName=new Object(){}.getClass().getEnclosingMethod().getName();
        LOGGER.info("{}.{} created a wishlist with id: {}, name: {} for user with id: {}",this.getClass().getSimpleName(),methodName,savedWishlist.getWishlistId(),savedWishlist.getWishlistName(),savedWishlist.getProfileId());

        DetailedWishlistDto detailedWishlist = new DetailedWishlistDto();
        detailedWishlist.setWishlistId(savedWishlist.getWishlistId());
        detailedWishlist.setProfileId(savedWishlist.getProfileId());
        detailedWishlist.setWishlistName(savedWishlist.getWishlistName());
        detailedWishlist.setProducts(new ArrayList<>());

        return detailedWishlist;
    }

    @Override
    public String addProductToWishlist(WishlistDto wishlistDto) {
        Wishlist foundWishlist = repository.findById(wishlistDto.getWishlistId()).get();

        foundWishlist.getProducts().add(wishlistDto.getProductId());

        repository.save(foundWishlist);

        String methodName=new Object(){}.getClass().getEnclosingMethod().getName();
        LOGGER.info("{}.{} added the product with id: {} to wishlist with id: {}",this.getClass().getSimpleName(),methodName,wishlistDto.getProductId(),wishlistDto.getWishlistId());

        return "Product successfully added to wishlist";
    }

    @Override
    public DetailedWishlistDto getWishlistByWishlistId(String wishlistId) {
        Wishlist foundWishlist = repository.findById(wishlistId).get();

        List<String> productIds = foundWishlist.getProducts();

        DetailedWishlistDto detailedWishlistDto = new DetailedWishlistDto();
        detailedWishlistDto.setWishlistId(foundWishlist.getWishlistId());
        detailedWishlistDto.setWishlistName(foundWishlist.getWishlistName());
        detailedWishlistDto.setProfileId(foundWishlist.getProfileId());

        List<Product> products = productClient.getProductsById(productIds);
        detailedWishlistDto.setProducts(products);

        String methodName=new Object(){}.getClass().getEnclosingMethod().getName();
        LOGGER.info("{}.{} found wishlist with id: {}",this.getClass().getSimpleName(),methodName,wishlistId);

        return detailedWishlistDto;
    }

    @Override
    public Map<String, String> getWishlistIdsAndNamesByProfileId(String profileId) {
        Map<String, String> wishlistIdsAndNames = new HashMap<>();

        List<Wishlist> wishlists = repository.findByProfileId(profileId);

        wishlists.forEach(wl->wishlistIdsAndNames.put(wl.getWishlistId()
        ,wl.getWishlistName()));

        String methodName=new Object(){}.getClass().getEnclosingMethod().getName();
        LOGGER.info("{}.{} mapped the wishlistIds to wishlist names for profileId: {}",this.getClass().getSimpleName(),methodName,profileId);

        return wishlistIdsAndNames;
    }

    @Override
    public String deleteProductFromWishlist(WishlistDto wishlistDto) {
        String wishlistId = wishlistDto.getWishlistId();
        String productId = wishlistDto.getProductId();

        Wishlist foundWishlist = repository.findById(wishlistId).get();

        List<String> productIds = foundWishlist.getProducts().stream().filter(pid->!pid.equals(productId)).collect(Collectors.toList());

        foundWishlist.setProducts(productIds);
        repository.save(foundWishlist);

        String methodName=new Object(){}.getClass().getEnclosingMethod().getName();
        LOGGER.info("{}.{} deleted the product with id: {} from wishlist with id: {}",this.getClass().getSimpleName(),methodName,wishlistDto.getProductId(),wishlistDto.getWishlistId());

        return "Product deleted successfully from wishlist";
    }

    @Override
    public String deleteWishlistByWishlistId(String wishlistId) {
        Wishlist foundWishlist = repository.findById(wishlistId).get();

        repository.delete(foundWishlist);

        String methodName=new Object(){}.getClass().getEnclosingMethod().getName();
        LOGGER.info("{}.{} deleted wishlist with id: {}",this.getClass().getSimpleName(),methodName,wishlistId);

        return "Wishlist deleted successfully";
    }
}
