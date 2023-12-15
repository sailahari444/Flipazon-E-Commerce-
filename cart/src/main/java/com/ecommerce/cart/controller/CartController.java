package com.ecommerce.cart.controller;

import com.ecommerce.cart.dto.CartItemDto;
import com.ecommerce.cart.dto.CartItemWithProductDetailsDto;
import com.ecommerce.cart.entity.CartItem;
import com.ecommerce.cart.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@Tag(name = "CRUD REST APIs for Cart Service", 
description = "Add Products to Cart, Get all Cart items, Update Cart items, Delete Cart items")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	private static final Logger log = LoggerFactory.getLogger(CartController.class);

	/**
	 * This method is used to add products into the cart and to save the cart items into the database.
	 * 
	 * @param cartItem cartItem contains profileId, productId and quantity
	 * @return details of the cart items saved in the database
	 */
	@Operation(summary = "Create Cart Item REST API", 
			description = "Create Cart Endpoint is used to add a product into the cart by profile id, product id and quantity as parameters")
	@ApiResponse(responseCode = "201", description = "HTTP Status 201 CREATED")
	@PostMapping("/addProductToCart")
	public ResponseEntity<CartItem> saveCartItem(@RequestBody CartItemDto cartItemDto) {
		log.info("POST    /api/cart/addProductToCart  saving a product into the cart with profileId: {} and productId: {}",
				cartItemDto.getProfileId(), cartItemDto.getProductDetails());
		return new ResponseEntity<>(cartService.saveCartItem(cartItemDto), HttpStatus.CREATED);
	}

	/**
	 * This method is used to update the details of the items in the cart
	 * 
	 * @param cartItem cartItemDto contains the updated details of the cart item
	 * @return the updated cart item details
	 */
	@Operation(summary = "Update Cart Item REST API", 
			description = "Update Cart Endpoint is used to update details of a cart item in the cart by profile id, product id and quantity as parameters")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@PutMapping("/updateCartItem")
	public ResponseEntity<CartItem> updateCartItem(@RequestBody CartItem cartItem) {
		log.info("PUT    /api/cart/updateCartItem  updating a cart item with profileId: {} and productId: {}",
				cartItem.getProfileId(), cartItem.getProductDetailsList());
		return new ResponseEntity<>(cartService.updateCartItem(cartItem), HttpStatus.OK);
	}

	/**
	 * This method is used to get the cart items by ProfileId
	 * 
	 * @param profileId profileId whose cart items has to be fetched
	 * @return the list of fetched cart item details
	 */
	@Operation(summary = "Get Cart Item REST API", 
			description = " Get Cart Endpoint is used to fetch all the cart items in the cart for the given profile id")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@GetMapping("/getCartItemsByProfileId/{profileId}")
	public ResponseEntity<CartItemWithProductDetailsDto> getCartItemsByProfileId(@PathVariable String profileId) {
		log.info("GET /api/cart/getCartItemsByProfileId/{} gets all cart items of Profile with ProfileId: {}",
				profileId, profileId);
		return new ResponseEntity<>(cartService.getCartItemsByProfileId(profileId), HttpStatus.OK);
	}

	/**
	 * This method is used to delete a single cart item by profileId and the productId
	 * 
	 * @param cartItemId cartItemId includes the profileId and the productId
	 * @return
	 */
//	@Operation(
//			summary = "Deletes a product in the cart",
//			description = "In this api we delete a product in the cart by taking product id and profile id as parameter"
//	)
//	@ApiResponse(
//			responseCode = "200",
//			description = "Returns Cart item deleted message"
//	)
//	@DeleteMapping("/deleteCartItemByCartId")
//	public ResponseEntity<String> deleteCartItemByCartItemId(@RequestBody String cartId){
//		cartService.deleteCartItemByCartItemId(cartId);
//		log.info("DELETE /api/cart/deleteCartItemByProfileIdAndProductId  deleting cart item of a profile");
//		return new ResponseEntity<>("Cart item deleted successfully", HttpStatus.OK);
//	}

	/**
	 * This method is used to delete all the cart items of a single profile
	 * 
	 * @param profileId profileId whose cart items should be deleted
	 * @return
	 */
	@Operation(summary = "Delete Cart Item REST API", description = "Delete Cart Endpoint is used to delete all the cart items for a single profile by profileId")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@DeleteMapping("/deleteCartItemsByProfileId/{profileId}")
	public ResponseEntity<String> deleteCartItemsByProfileId(@PathVariable String profileId) {
		cartService.deleteCartItemsByProfileId(profileId);
		log.info("DELETE /api/cart/deleteCartItemsByProfileId/{} deleting cart items of a profile with profileId: {}",
				profileId, profileId);
		return new ResponseEntity<>("Cart items deleted successfully", HttpStatus.OK);
	}

	@GetMapping("/getCartItemCount/{profileId}")
	public int getCartItemCount(@PathVariable String profileId){
		return cartService.getCartItemCount(profileId);
	}
	
	
}
