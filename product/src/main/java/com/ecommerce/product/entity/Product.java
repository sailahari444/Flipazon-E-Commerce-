package com.ecommerce.product.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PRODUCT_TBL")
public class Product {

    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    private String productId;
    private String productName;
    private String productDescription;
    @ElementCollection
    private List<String> productImageUrl;
    private double productPrice;

}