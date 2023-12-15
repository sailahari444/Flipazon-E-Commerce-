package com.ecommerce.orders.dto;


import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(
        description = "OrderRequest Model Information"
)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
	@Schema(
	        description = "Order Id"
	)
	private String orderId;
	@Schema(
	        description = "List of OrderLineItemsDto"
	)
    private List<OrderLineItemsDto> orderLineItemsDtoList;
	
	@Schema(
	        description = "Address of order"
	)
    private String addressId;
	
	@Schema(
	        description = "ProfileId of Profile"
	)
    private String profileId;
}
