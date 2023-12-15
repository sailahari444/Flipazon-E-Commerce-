package com.ecommerce.cart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CartItem {
//  @EmbeddedId
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String cartId;
    private String profileId;
    @ElementCollection
    private List<ProductDetails> productDetailsList;

    public CartItem(String profileId, List<ProductDetails> productDetailsList) {
        this.profileId = profileId;
        this.productDetailsList = productDetailsList;
    }
}