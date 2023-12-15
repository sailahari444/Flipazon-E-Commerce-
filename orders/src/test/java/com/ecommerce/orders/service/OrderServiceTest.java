package com.ecommerce.orders.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.ecommerce.orders.dto.OrderLineItemsDto;
import com.ecommerce.orders.dto.OrderResponse;
import com.ecommerce.orders.model.Order;
import com.ecommerce.orders.model.OrderLineItems;
import com.ecommerce.orders.repository.OrderRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;



@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {
	
	@Mock
	private OrderRepository orderRepository;
	
	@InjectMocks
	private OrderService orderService;
	
	
	ObjectMapper objectMapper = new ObjectMapper();
	ObjectWriter objectWriter = objectMapper.writer();
	

	
	@Test
	public void getOrderByProfileIdTest() throws Exception {
		List<Order> orders = new ArrayList<>();
		
		Order order1 = new Order();
		order1.setOrderId("123qwe");
		order1.setOrderPlacedDateTime(new Date(123,5,23));
		order1.setAddressId("add123");
		order1.setStatus("Delivered");
		order1.setProfileId("prof123");
		order1.setOrderLineItemsList(Arrays.asList( new OrderLineItems("0a421a3d-88bd-1d97-8188-bdfe0ac70000",new BigDecimal(8938.00),4,"pro456")));
		
		orders.add(order1);
		
		when(orderRepository.findByProfileId("prof123")).thenReturn(orders);
		
		List<OrderResponse> result = orderService.getByProfileId("prof123");
		
		assertEquals("Delivered", result.get(0).getStatus() );
		assertEquals(BigDecimal.valueOf(8938), result.get(0).getOrderLineItemsDtos().get(0).getPrice());
		assertEquals(new Date(123,5,23), result.get(0).getOrderPlacedDateTime());
		
		assertEquals(order1.getProfileId(), result.get(0).getProfileId());
		
		Mockito.verify(orderRepository,Mockito.times(1)).findByProfileId("prof123");

	}
	
	@Test
	public void getOrderByOrderIdTest() throws Exception {

		
		Order order1 = new Order();
		order1.setOrderId("123qwe");
		order1.setOrderPlacedDateTime(new Date(123,5,23));
		order1.setAddressId("add123");
		order1.setStatus("Delivered");
		order1.setProfileId("prof123");
		order1.setOrderLineItemsList(Arrays.asList( new OrderLineItems("0a421a3d-88bd-1d97-8188-bdfe0ac70000",new BigDecimal(8938.00),4,"pro456")));

		
		when(orderRepository.getById("123qwe")).thenReturn(order1);
		
		OrderResponse result = orderService.getOrderById("123qwe");
		
		assertEquals("Delivered", result.getStatus() );
		assertEquals(BigDecimal.valueOf(8938), result.getOrderLineItemsDtos().get(0).getPrice());
		assertEquals(new Date(123,5,23), result.getOrderPlacedDateTime());
		
		assertEquals(order1.getProfileId(), result.getProfileId());
		
		Mockito.verify(orderRepository,Mockito.times(1)).getById("123qwe");
		
	}
	
	@Test 
	public void deleteOrderByIdTest() {
		
		Mockito.doNothing().when(orderRepository).deleteById("123qwe");
		
		orderService.deleteOrderById("123qwe");
	
		Mockito.verify(orderRepository,Mockito.times(1)).deleteById("123qwe");
		
	}

	
	


}
