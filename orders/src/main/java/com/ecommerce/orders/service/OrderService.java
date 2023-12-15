package com.ecommerce.orders.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.orders.dto.OrderLineItemsDto;
import com.ecommerce.orders.dto.OrderRequest;
import com.ecommerce.orders.dto.OrderResponse;
import com.ecommerce.orders.model.Order;
import com.ecommerce.orders.model.OrderLineItems;
import com.ecommerce.orders.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

	private final OrderRepository orderRepository;

	public String saveOrder(OrderRequest orderRequest) {

		Order order = new Order();

		Date date = new Date();
		order.setOrderPlacedDateTime(date);
		order.setAddressId(orderRequest.getAddressId());
		
		order.setProfileId(orderRequest.getProfileId());

		List<OrderLineItems> orderLineItems = orderRequest.getOrderLineItemsDtoList().stream()
				.map(orderLineItemsDto -> mapToDto(orderLineItemsDto)).collect(Collectors.toList());

		order.setOrderLineItemsList(orderLineItems);
		order.setStatus("Opened");
		Order savedOrder=orderRepository.save(order);
		return savedOrder.getOrderId();

	}

	private OrderLineItems mapToDto(OrderLineItemsDto orderLineItemsDto) {
		OrderLineItems orderLineItems = new OrderLineItems();
		orderLineItems.setPrice(orderLineItemsDto.getPrice());
		orderLineItems.setQuantity(orderLineItemsDto.getQuantity());
		orderLineItems.setProductId(orderLineItemsDto.getProductId());
	
		return orderLineItems;
	}



	
	public OrderResponse getOrderById(String orderId) {

		Order order = orderRepository.getById(orderId);
		OrderResponse orderResponse = new OrderResponse();

		List<OrderLineItemsDto> items = order.getOrderLineItemsList().stream()
				.map(orderLineItemsDto -> mapToDto(orderLineItemsDto)).toList();

		orderResponse.setOrderLineItemsDtos(items);
		orderResponse.setOrderPlacedDateTime(order.getOrderPlacedDateTime());
		orderResponse.setAddressId(order.getAddressId());
		orderResponse.setProfileId(order.getProfileId());
		orderResponse.setOrderId(order.getOrderId());
		orderResponse.setStatus(order.getStatus());

		return orderResponse;

	}
	
	private OrderLineItemsDto mapToDto(OrderLineItems orderLineItems) {
		OrderLineItemsDto orderLineItemsDto = new OrderLineItemsDto();
		orderLineItemsDto.setItemId(orderLineItems.getItemId());
		orderLineItemsDto.setPrice(orderLineItems.getPrice());
		orderLineItemsDto.setQuantity(orderLineItems.getQuantity());
		orderLineItemsDto.setProductId(orderLineItems.getProductId());
		return orderLineItemsDto;

	}



	public List<OrderResponse> getByProfileId(String profileId) {
			
		List<Order> orders = orderRepository.findByProfileId(profileId); 
		List<OrderResponse> orderResponse= new ArrayList<>();
		
		for(Order order:orders) {
			List<OrderLineItemsDto> items = order.getOrderLineItemsList().stream()
					.map(orderLineItemsDto -> mapToDto(orderLineItemsDto)).toList();
			
			OrderResponse orderResp=new OrderResponse();
			orderResp.setOrderLineItemsDtos(items);
			orderResp.setOrderPlacedDateTime(order.getOrderPlacedDateTime());
			orderResp.setAddressId(order.getAddressId());
			orderResp.setProfileId(order.getProfileId());
			orderResp.setOrderId(order.getOrderId());
			orderResp.setStatus(order.getStatus());
			
			orderResponse.add(orderResp);			
		}
		
	
	
		return orderResponse;
	}

	
	
	
//	public Boolean didUserPurchaseProduct(String profileId, String productId) {
//		
//		List<Order> orders = orderRepository.findByProfileId(profileId);
//		System.out.println(orders);
//
//		
//		for(Order order:orders) {
//			
//			for(OrderLineItems item:order.getOrderLineItemsList()) {
//				if(item.getProductId().equals(productId)) {
//					return true;
//				}
//			}
//		}
//		
//		return false;
//	}

	
	
	
	public void updateOrderStatusByOrderId(OrderRequest orderRequest) {
		Order order = orderRepository.findById(orderRequest.getOrderId()).get();
		
		order.setStatus("Delivered");
		orderRepository.save(order);
	}
	
	
	
	public void deleteOrderById(String orderId) {
		orderRepository.deleteById(orderId);
	}

//	public void updateOrderByOrderId(OrderRequest orderRequest) {
//		Order order = orderRepository.findById(orderRequest.getOrderId()).get();
//		
//		order.getOrderLineItemsList().clear();
//		order.setAddressId(orderRequest.getAddressId());
//		orderRequest.getOrderLineItemsDtoList().stream()
//				.map(orderLineItemsDto -> mapToDto(orderLineItemsDto)).forEach(orderLineItem->order.getOrderLineItemsList().add(orderLineItem));
//		
//		orderRepository.save(order);
//	}

}