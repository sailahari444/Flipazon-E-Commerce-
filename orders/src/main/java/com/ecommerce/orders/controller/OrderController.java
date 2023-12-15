package com.ecommerce.orders.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.orders.constants.OrderControllerConstants;
import com.ecommerce.orders.dto.OrderRequest;
import com.ecommerce.orders.dto.OrderResponse;
import com.ecommerce.orders.service.OrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "CRUD REST APIs for Order Service", description = "CRUD REST APIs - Create Order, Get Order, Delete Order")
@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

	private static final Logger LOGGER = LoggerFactory.getLogger(OrderController.class);

	private final OrderService orderService;
	
	

	/**
	 * This method saves order details in the Database.
	 * 
	 * @param orderRequest - it takes order details
	 * @return returns a success message on successful placement of order
	 */
	@Operation(summary = "Save Order REST API", description = "Save Order REST API is used to save a new order in database")
	@ApiResponse(responseCode = "201", description = "HTTP Status 201 CREATED")
	@PostMapping("/saveOrder")
	public ResponseEntity<String> saveOrder(@RequestBody OrderRequest orderRequest) {

		String res=orderService.saveOrder(orderRequest);
		LOGGER.info("Order Placed with :profileId = {}", orderRequest.getProfileId());
		return new ResponseEntity<String>(res, HttpStatus.CREATED);
	}
	
	
	

	/**
	 * This method displays order details to the user.
	 * 
	 * @param orderId - it takes orderId of order to find order details
	 * @return it returns order details
	 */
	@Operation(summary = "Get Order REST API", description = "Get Order REST API is used to fetch a order based on orderId from database")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@GetMapping("/getOrderById/{orderId}")
	public ResponseEntity<OrderResponse> getByOrderId(@PathVariable String orderId) {

		OrderResponse orderResponse = orderService.getOrderById(orderId);
		LOGGER.info("Order fetched with :OrderId = {}", orderId);
		return new ResponseEntity<>(orderResponse, HttpStatus.OK);
	}
	

	
	
	
	/**
	 * This method displays all the order details of a user.
	 * 
	 * @param profileId - it takes profileId of order to find order details of a User.
	 * @return it returns order details
	 */
	@Operation(summary = "Get Order REST API", description = "Get Order REST API is used to fetch a order based on profileId of a user from database")
	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@GetMapping("/getOrdersByProfileId/{profileId}")
	public ResponseEntity<List<OrderResponse>> getByProfileId(@PathVariable String profileId) {

		List<OrderResponse> orderResponse = orderService.getByProfileId(profileId);
		LOGGER.info("Order fetched with :profileId = {}", profileId);
		return new ResponseEntity<>(orderResponse, HttpStatus.OK);
	}
	
	
	

//	/**
//	 * This method deletes the order from Database using orderId.
//	 * 
//	 * @param orderId - it takes orderId of order to delete order details
//	 * @return returns a success message on successful deletion of order
//	 */
//	@Operation(summary = "Delete Order REST API", description = "Delete Order REST API is used to delete a order from database")
//	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
	@DeleteMapping("/deleteOrderById/{orderId}")
	public ResponseEntity<String> deleteOrderId(@PathVariable String orderId) {

		orderService.deleteOrderById(orderId);
		LOGGER.info("Order Cancelled with :OrderId = {}", orderId);
		return new ResponseEntity<String>(OrderControllerConstants.ORDER_CANCEL, HttpStatus.OK);
	}
	
	
	
//
//	/**
//	 * This method checks whether the user has purchased the product.
//	 * 
//	 * @param profileId and productId - It takes profileId and productId to check whether the user has purchased the product.
//	 * @return returns a Boolean value 
//	 */
//	@Operation(summary = "didUserPurchaseProduct REST API", description = "didUserPurchaseProduct REST API is used to check whether the user has purchased the product")
//	@ApiResponse(responseCode = "200", description = "HTTP Status 200 SUCCESS")
//	@GetMapping("/didUserPurchaseProduct")
//	public ResponseEntity<Boolean> didUserPurchaseProduct(@RequestParam("profileId") String profileId,
//			@RequestParam("productId") String productId) {
//		
//
//		Boolean status = orderService.didUserPurchaseProduct(profileId, productId);
//
//		return new ResponseEntity<>(status, HttpStatus.OK);
//	}
	
	
	
	@PutMapping("/updateOrderStatusByOrderId")
	public ResponseEntity<String> updateOrderStatusByOrderId(@RequestBody OrderRequest orderRequest) {
		orderService.updateOrderStatusByOrderId(orderRequest);	
		return new ResponseEntity<String>(OrderControllerConstants.ORDER_UPDATE, HttpStatus.CREATED);
		
	}
	
//	@PutMapping("/updateOrderByOrderId")
//	public ResponseEntity<String> updateOrderByOrderId(@RequestBody OrderRequest orderRequest) {
//
//		orderService.updateOrderByOrderId(orderRequest);
//		LOGGER.info("Order Placed with :profileId = {}", orderRequest.getProfileId());
//		return new ResponseEntity<String>(OrderControllerConstants.ORDER_UPDATE, HttpStatus.CREATED);
//	}
	
}



