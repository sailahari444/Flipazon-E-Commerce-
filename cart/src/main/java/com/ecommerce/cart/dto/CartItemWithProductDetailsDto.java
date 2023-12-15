package com.ecommerce.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemWithProductDetailsDto {

    private String cartId;
    private String profileId;
    private List<ProductDetailsDto> productDetailsDtoList;
}
