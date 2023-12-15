package com.ecommerce.wishlist.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private String productId;
    private String productName;
    private String productDescription;
    private List<String> productImageUrl;
    private double productPrice;
}