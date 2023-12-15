package com.ecommerce.orders.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.ecommerce.orders.constants.OrderControllerConstants;
import com.ecommerce.orders.dto.OrderLineItemsDto;
import com.ecommerce.orders.dto.OrderRequest;
import com.ecommerce.orders.dto.OrderResponse;
import com.ecommerce.orders.model.Order;
import com.ecommerce.orders.model.OrderLineItems;
import com.ecommerce.orders.repository.OrderRepository;
import com.ecommerce.orders.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;


@WebMvcTest(OrderController.class)
public class orderControllerTest {
	
	@MockBean
	private OrderService orderService;
	
	@InjectMocks
	private OrderController orderController;
	
	@Autowired
	private MockMvc mockMvc;
	
	
	ObjectMapper objectMapper = new ObjectMapper();
	ObjectWriter objectWriter = objectMapper.writer();
	
	
	
	@Test
	public void getOrderByProfileIdTest() throws Exception {
		when(orderService.getByProfileId("prof463")).thenReturn(
				Arrays.asList(new OrderResponse("0a421a3d-88bd-1838-8188-bdd8afd10000",Arrays.asList(new OrderLineItemsDto("0a421a3d-88bd-1d97-8188-bdfe0ac70000",new BigDecimal(8938.00),4,"pro456"),new OrderLineItemsDto("0a421a3d-88bd-1d97-8188-bdfe0aed0001",new BigDecimal(638.00),1,"pro789")),"add56",new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX").parse("2023-06-15T06:57:54.606+00:00"),"prof463","Delivered")));
		
		RequestBuilder request = MockMvcRequestBuilders
				.get("/api/order/getOrdersByProfileId/{profileId}","prof463")		
				.accept(MediaType.APPLICATION_JSON);
		
		MvcResult result = mockMvc.perform(request)
				.andExpect(status().isOk())
				.andExpect(content().json("[{\"orderId\":\"0a421a3d-88bd-1838-8188-bdd8afd10000\",\"orderLineItemsDtos\":[{\"itemId\":\"0a421a3d-88bd-1d97-8188-bdfe0ac70000\",\"price\":8938.00,\"quantity\":4,\"productId\":\"pro456\"},{\"itemId\":\"0a421a3d-88bd-1d97-8188-bdfe0aed0001\",\"price\":638.00,\"quantity\":1,\"productId\":\"pro789\"}],\"addressId\":\"add56\",\"orderPlacedDateTime\":\"2023-06-15T06:57:54.606+00:00\",\"profileId\":\"prof463\",\"status\":\"Delivered\"}]"))
				.andReturn();
		
		Mockito.verify(orderService,Mockito.times(1)).getByProfileId("prof463");
		//JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false);
		
	}
	



@Test
public void getOrderByOrderIdTest() throws Exception {
	when(orderService.getOrderById("0a421a3d-88bd-1838-8188-bdd8afd10000")).thenReturn(
			new OrderResponse("0a421a3d-88bd-1838-8188-bdd8afd10000",Arrays.asList(new OrderLineItemsDto("0a421a3d-88bd-1d97-8188-bdfe0ac70000",new BigDecimal(8938.00),4,"pro456"),new OrderLineItemsDto("0a421a3d-88bd-1d97-8188-bdfe0aed0001",new BigDecimal(638.00),1,"pro789")),"add56",new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX").parse("2023-06-15T06:57:54.606+00:00"),"prof463","Delivered"));
	
	RequestBuilder request = MockMvcRequestBuilders
			.get("/api/order/getOrderById/{orderId}","0a421a3d-88bd-1838-8188-bdd8afd10000")		
			.accept(MediaType.APPLICATION_JSON);
	
	MvcResult result = mockMvc.perform(request)
			.andExpect(status().isOk())
			.andExpect(content().json("{\"orderId\": \"0a421a3d-88bd-1838-8188-bdd8afd10000\",\"orderLineItemsDtos\": [{\"itemId\": \"0a421a3d-88bd-1d97-8188-bdfe0ac70000\",\"price\": 8938.00,\"quantity\": 4,\"productId\": \"pro456\"},{\"itemId\": \"0a421a3d-88bd-1d97-8188-bdfe0aed0001\",\"price\": 638.00,\"quantity\": 1,\"productId\": \"pro789\"}],\"addressId\": \"add56\",\"orderPlacedDateTime\": \"2023-06-15T06:57:54.606+00:00\",\"profileId\": \"prof463\",\"status\": \"Delivered\"}"))
			.andReturn();
	//JSONAssert.assertEquals(expected, result.getResponse().getContentAsString(), false); "profileId": "prof463",
	Mockito.verify(orderService,Mockito.times(1)).getOrderById("0a421a3d-88bd-1838-8188-bdd8afd10000");
	
}

@Test
public void deleteBookByIdTest() throws Exception{
	
	Mockito.doNothing().when(orderService).deleteOrderById("0a421a3d-88bd-1838-8188-bdd8afd10000");
			
	MockHttpServletRequestBuilder request = MockMvcRequestBuilders
			.delete("/api/order/deleteOrderById/{orderId}","0a421a3d-88bd-1838-8188-bdd8afd10000")
			.contentType(MediaType.APPLICATION_JSON);
	
	mockMvc.perform(request)
	.andExpect(status().isOk());
	
	Mockito.verify(orderService,Mockito.times(1)).deleteOrderById("0a421a3d-88bd-1838-8188-bdd8afd10000");


}


@Test
public void saveOrderTest() throws Exception {
	
	OrderRequest orderRequest = new OrderRequest();
	orderRequest.setOrderId("123qwe");
	orderRequest.setAddressId("add123");
	orderRequest.setProfileId("prof123");
	orderRequest.setOrderLineItemsDtoList(Arrays.asList( new OrderLineItemsDto("0a421a3d-88bd-1d97-8188-bdfe0ac70000",new BigDecimal(8938.00),4,"pro456")));
	

	
	Mockito.doNothing().when(orderService).saveOrder(orderRequest);
	
	String content = objectWriter.writeValueAsString(orderRequest);

	
	MockHttpServletRequestBuilder request = MockMvcRequestBuilders
			.post("/api/order/saveOrder")
			.contentType(MediaType.APPLICATION_JSON)
			.accept(MediaType.APPLICATION_JSON)
			.content(content);
	
	mockMvc.perform(request)
	.andExpect(status().isCreated());
	
	
	Mockito.verify(orderService,Mockito.times(1)).saveOrder(orderRequest);
			
}

@Test
public void updateOrderStatusByOrderIdTest() throws Exception {
	
	OrderRequest orderRequest = new OrderRequest();
	orderRequest.setOrderId("123qwe");

	Mockito.doNothing().when(orderService).updateOrderStatusByOrderId(orderRequest);

	MockHttpServletRequestBuilder request = MockMvcRequestBuilders
			.put("/api/order/updateOrderStatusByOrderId")
			.content("{\"orderId\":\"123qwe\"}")
			.contentType(MediaType.APPLICATION_JSON);
	
	mockMvc.perform(request)
	.andExpect(status().isCreated());
	
	Mockito.verify(orderService,Mockito.times(1)).updateOrderStatusByOrderId(orderRequest);
	
}



//
//@Test
//public void getNoOrderByProfileId() throws Exception {
//	when(orderService.getByProfileId("prof463")).thenReturn(
//			Arrays.asList()
//			);
//	
//	RequestBuilder request = MockMvcRequestBuilders
//			.get("/api/order/getOrdersByProfileId/{profileId}","prof463")
//			.accept(MediaType.APPLICATION_JSON);
//	
//	MvcResult result = mockMvc.perform(request)
//			.andExpect(status().isOk())
//			.andExpect(content().json("[]"))
//			.andReturn();
//	
//	Mockito.verify(orderService,Mockito.times(1)).getByProfileId("prof463");
//
//}

}