package com.ecommerce.orders.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

import io.swagger.v3.oas.annotations.media.Schema;


@Schema(
        description = "OrderLineItemsDto Model Information"
)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderLineItemsDto {
	
	@Schema(
	        description = "OrderId of Order"
	)
    private String itemId;
	
	@Schema(
	        description = "Price of order"
	)
    private BigDecimal price;
	
	@Schema(
	        description = "Quantity of the product"
	)
    private Integer quantity;
    
	@Schema(
	        description = "ProductId of product"
	)
    private String productId;
}
