package com.ecommerce.productratingservice.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.productratingservice.dto.RatingDto;
import com.ecommerce.productratingservice.exception.ResourceNotFoundException;
import com.ecommerce.productratingservice.service.RatingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "CRUD REST APIs for Product rating Service", description = "CRUD REST APIs - Create Product Rating, Update Product Rating, Get Product Rating, Delete Product Rating")
@RequestMapping("/api/productRating")
@RestController
public class RatingController {

	@Autowired
	private RatingService ratingService;
	private static final Logger LOGGER = LoggerFactory.getLogger(RatingController.class);

	/**
	 * This method is used to save a Product Rating by a User for a product
	 * 
	 * @param ratingDto rating to be saved
	 * @return the saved Rating
	 */
	@Operation(summary = "Create Product Rating REST API", description = "Create Product Rating Endpoint to save a Product Rating by a User for a product")
	@ApiResponse(responseCode = "201", description = "HTTP Status 201 CREATED")
	@PostMapping("/addRating")
	public ResponseEntity<RatingDto> saveRating(@Valid @RequestBody RatingDto ratingDto) {
		LOGGER.info("POST /api/productRating/addRating saving review for product: {} by user: {}",
				ratingDto.getProductId(), ratingDto.getUserId());
		System.out.println(ratingService.saveRating(ratingDto));
		return new ResponseEntity<RatingDto>(ratingService.saveRating(ratingDto), HttpStatus.CREATED);
	}

	/**
	 * This method is used to get all Rating for a Product by its ProductID
	 * 
	 * @param productId productId of the Product whose rating to be fetched
	 * @return a list of ProductRating for a product and TotalRating
	 */
	@Operation(summary = "Get Product Rating REST API", description = "Get Product Rating REST API Endpoint to get all Rating for a Product by its ProductID")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@GetMapping("/getProductRatingByProductId/{productId}")
	public ResponseEntity<Map<String, Object>> getRatingByProductId(@PathVariable("productId") String productId) {
		LOGGER.info("GET /api/productRating/getProductRatingByProductId  ProductId: {}", productId);
		return ResponseEntity.ok(ratingService.getRatingByProductId(productId));
	}

	/**
	 * This method is to get Rating of a Product by a User
	 * 
	 * @param userId    userId of user to get rating of product done by the user
	 * @param productId productId of the Product whose rating to be fetched
	 * @return RatingDto which contains the rating done by a user for a product
	 * @throws ResourceNotFoundException when no data present in database for the
	 *                                   parameters
	 */
	@Operation(summary = "Get Product Rating REST API", description = "Get Product Rating REST API Endpoint to get Rating of a Product by a User")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@GetMapping("/getProductRatingByUserId")
	public ResponseEntity<RatingDto> getRatingByUserIdAndProductId(@RequestParam("productId") String productId,
			@RequestParam("userId") String userId) throws ResourceNotFoundException {
		LOGGER.info("GET /api/productRating/getProductRatingByUserId ProductId: {} for User: {}", productId, userId);
		return ResponseEntity.ok(ratingService.getRatingByUserIdAndProductId(productId, userId));
	}

	/**
	 * This method is to update Rating of a product by a User in database
	 * 
	 * @param ratingDto rating to be updated
	 * @return the updated Rating
	 * @throws ResourceNotFoundException
	 */
	@Operation(summary = "Update Product Rating REST API", description = "Update Product Rating REST API Endpoint used to update Product Rating by a User in database")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@PutMapping("/updateRating")
	public ResponseEntity<RatingDto> updateRating(@Valid @RequestBody RatingDto ratingDto,
												  @RequestParam("productId") String productId, @RequestParam("userId") String userId)
			throws ResourceNotFoundException {
		LOGGER.info("PUT /api/productRating/updateRating  updating review for product: {} by user: {}",
				ratingDto.getProductId(), ratingDto.getUserId());
		return ResponseEntity.ok(ratingService.updateRating(productId, userId, ratingDto));
	}

	/**
	 * This method is to delete Rating of a product by a User in database
	 * 
	 * @param userId    userId of user to get rating of product done by the user
	 * @param productId productId of the Product whose rating to be fetched
	 * @return a success message indicating that the rating of a product by user was
	 *         successfully deleted
	 * @throws ResourceNotFoundException when no data present in database for the
	 *                                   parameters
	 */
	@Operation(summary = "Delete Product Rating REST API", description = "Delete Product Rating REST API Endpoint is used to delete Product Rating from database")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@DeleteMapping("/deleteRating")
	public ResponseEntity<String> deleteRating(@RequestParam("productId") String productId,
			@RequestParam("userId") String userId) throws ResourceNotFoundException {
		LOGGER.info("DELETE /api/productRating/deleteRating  deleting review for product: {} by user: {}", productId,
				userId);
		ratingService.deleteRating(productId, userId);
		return new ResponseEntity<String>("Rating Deleted Succesfully", HttpStatus.OK);
	}
}
