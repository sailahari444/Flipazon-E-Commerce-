package com.ecommerce.orders.dto;

import java.util.Date;
import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(
        description = "OrderResponse Model Information"
)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponse {
	
	@Schema(
	        description = "Order Id"
	)
	private String orderId;
	
	@Schema(
	        description = "List of orderLineItemsDtos"
	)
	private List<OrderLineItemsDto> orderLineItemsDtos;
	
	@Schema(
	        description = "Address Id of Order"
	)
    private String addressId;
	
	@Schema(
	        description = "DateTime of Order placed"
	)
    private Date orderPlacedDateTime;
    
    @Schema(
            description = "Profile Id of Profile"
    )
    private String profileId;
    
    @Schema(
            description = "Order Status"
    )
    private String status;
}
