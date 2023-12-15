package com.ecommerce.wishlist.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Entity
@Table(name = "wishlist")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Wishlist {

    @Id
    @GeneratedValue
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    private String wishlistId;

    private String profileId;

    private String wishlistName;

    @ElementCollection(targetClass = String.class)
    @CollectionTable(name = "wishlist_products", joinColumns = @JoinColumn(name = "wishlist_id"))
    @Column(name = "product")
    private List<String> products;
}
