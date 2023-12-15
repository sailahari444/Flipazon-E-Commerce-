package com.ecommerce.orders.model;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.UuidGenerator;
import org.hibernate.annotations.UuidGenerator.Style;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Table(name = "t_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Order {
    @Id
    @GeneratedValue
    @UuidGenerator(style = Style.TIME)
    private String orderId;
    private String addressId;
    private String profileId;
    private Date orderPlacedDateTime;
    private String status;
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    private List<OrderLineItems> orderLineItemsList;
}
