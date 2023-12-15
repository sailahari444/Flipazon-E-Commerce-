package com.ecommerce.cart.dto;

import com.ecommerce.cart.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailsDto {
    private Product product;
    private int quantity;
}
