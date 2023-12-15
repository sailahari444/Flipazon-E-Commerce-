package com.ecommerce.orders.model;

import java.math.BigDecimal;

import org.hibernate.annotations.UuidGenerator;
import org.hibernate.annotations.UuidGenerator.Style;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_order_line_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderLineItems {
    @Id
    @GeneratedValue
    @UuidGenerator(style = Style.TIME)
    private String itemId;
    private BigDecimal price;
    private Integer quantity;
    private String productId;
}