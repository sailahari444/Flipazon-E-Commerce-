package com.ecommerce.wishlist.controller;

import com.ecommerce.wishlist.constants.WishlistControllerConstants;
import com.ecommerce.wishlist.dto.DetailedWishlistDto;
import com.ecommerce.wishlist.dto.WishlistDto;
import com.ecommerce.wishlist.service.WishlistService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(
        name = WishlistControllerConstants.TAG_NAME,
        description = WishlistControllerConstants.CONTROLLER_DESCRIPTION
)
@RestController
@RequestMapping("/api/wishlist")
@AllArgsConstructor
public class WishlistController {

    private WishlistService wishlistService;

    private static final Logger LOGGER= LoggerFactory.getLogger(WishlistController.class);

    /**
     *
     * @param wishlistDto contains the wishlist name and profile id for which the wishlist is to be created
     * @return the newly created wishlist
     */
    @Operation(
            summary = "Create Wishlist REST API",
            description = "Create wishlist REST API is used to create a new wishlist for a user"
    )
    @ApiResponse(
            responseCode = WishlistControllerConstants.CREATED_CODE,
            description = WishlistControllerConstants.CREATED_DESCRIPTION
    )
    @PostMapping("/createNewWishlist")
    public ResponseEntity<DetailedWishlistDto> createNewWishlist(@RequestBody WishlistDto wishlistDto){
        LOGGER.info("POST /api/wishlist/createNewWishlist a new wishlist with name: {} for user with profile id: {}",wishlistDto.getWishlistName(),wishlistDto.getProfileId());

        DetailedWishlistDto createdWishlist = wishlistService.createNewWishlist(wishlistDto);

        return new ResponseEntity<>(createdWishlist,HttpStatus.CREATED);
    }

    /**
     *
     * @param wishlistDto contains the wishlist id and product id which is to be added to that wishlist
     * @return a string indicating that the product was successfully added to the wishlist
     */
    @Operation(
            summary = "Add Product To Wishlist REST API",
            description = "Add product to wishlist REST API is used to add a product to a user's wishlist"
    )
    @ApiResponse(
            responseCode = WishlistControllerConstants.SUCCESS_CODE,
            description = WishlistControllerConstants.SUCCESS_DESCRIPTION
    )
    @PutMapping("/addProductToWishlist")
    public ResponseEntity<String> addProductToWishlist(@RequestBody WishlistDto wishlistDto){
        LOGGER.info("PUT /api/wishlist/addProductToWishlist adding product with id: {} to wishlist with id: {}",wishlistDto.getProductId(),wishlistDto.getWishlistId());

        String response = wishlistService.addProductToWishlist(wishlistDto);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    /**
     *
     * @param wishlistId the id of the wishlist to be fetched
     * @return the fetched wishlist
     */
    @Operation(
            summary = "Get Wishlist By WishlistId REST API",
            description = "Get wishlist by wishlistId REST API is used to get a user's wishlist by the wishlistId"
    )
    @ApiResponse(
            responseCode = WishlistControllerConstants.SUCCESS_CODE,
            description = WishlistControllerConstants.SUCCESS_DESCRIPTION
    )
    @GetMapping("/getWishlistByWishlistId/{wishlistId}")
    public ResponseEntity<DetailedWishlistDto> getWishlistByWishlistId(@PathVariable("wishlistId") String wishlistId){
        LOGGER.info("GET /api/wishlist/getWishlistByWishlistId/{wishlistId} getting wishlist with id: {}",wishlistId);

        DetailedWishlistDto detailedWishlistDto = wishlistService.getWishlistByWishlistId(wishlistId);

        return new ResponseEntity<>(detailedWishlistDto,HttpStatus.OK);
    }

    /**
     *
     * @param profileId the profile id for which the wishlist id's and names are to be fetched
     * @return a map containing all the wishlist id's and names for given profile id
     */
    @Operation(
            summary = "Get WishlistIds And Names By ProfileId REST API",
            description = "Get wishlistIds and names by profileId REST API is used to get the wishlist id's and names of all wishlist's created by a user"
    )
    @ApiResponse(
            responseCode = WishlistControllerConstants.SUCCESS_CODE,
            description = WishlistControllerConstants.SUCCESS_DESCRIPTION
    )
    @GetMapping("/getWishlistIdsAndNamesByProfileId/{profileId}")
    public ResponseEntity<Map<String,String>> getWishlistIdsAndNamesByProfileId(@PathVariable("profileId") String profileId){
        LOGGER.info("GET /api/wishlist/getWishlistIdsAndNamesByProfileId/{profileId} getting wishlist id's and names for user with id: {}",profileId);

        Map<String,String> wishlistIdsAndNames = wishlistService.getWishlistIdsAndNamesByProfileId(profileId);

        return new ResponseEntity<>(wishlistIdsAndNames,HttpStatus.OK);
    }

    /**
     *
     * @param wishlistDto contains the wishlist id and product id which is to be removed from that wishlist
     * @return a success message indicating that the product was successfully removed from the wishlist
     */
    @Operation(
            summary = "Delete Product From Wishlist REST API",
            description = "Delete product from wishlist REST API is used to delete a product from a user's wishlist"
    )
    @ApiResponse(
            responseCode = WishlistControllerConstants.SUCCESS_CODE,
            description = WishlistControllerConstants.SUCCESS_DESCRIPTION
    )
    @DeleteMapping("/deleteProductFromWishlist")
    public ResponseEntity<String> deleteProductFromWishlist(@RequestBody WishlistDto wishlistDto){
        LOGGER.info("DELETE /api/wishlist/deleteProductFromWishlist deleting product with id: {} from wishlist with id: {}",wishlistDto.getProductId(),wishlistDto.getWishlistId());

        String response = wishlistService.deleteProductFromWishlist(wishlistDto);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    /**
     *
     * @param wishlistId the id of the wishlist which is to be deleted
     * @return a success message indicating that the wishlist was successfully deleted
     */
    @Operation(
            summary = "Delete Wishlist REST API",
            description = "Delete wishlist REST API is used to delete a user's wishlist"
    )
    @ApiResponse(
            responseCode = WishlistControllerConstants.SUCCESS_CODE,
            description = WishlistControllerConstants.SUCCESS_DESCRIPTION
    )
    @DeleteMapping("/deleteWishlistByWishlistId/{wishlistId}")
    public ResponseEntity<String> deleteWishlistByWishlistId(@PathVariable("wishlistId") String wishlistId){
        LOGGER.info("DELETE /api/wishlist/deleteWishlistByWishlistId/{wishlistId} deleting wishlist with id: {}",wishlistId);

        String response = wishlistService.deleteWishlistByWishlistId(wishlistId);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
