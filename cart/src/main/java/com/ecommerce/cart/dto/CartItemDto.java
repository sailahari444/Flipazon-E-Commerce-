package com.ecommerce.cart.dto;

import com.ecommerce.cart.entity.ProductDetails;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private String profileId;
    private ProductDetails productDetails;
}
