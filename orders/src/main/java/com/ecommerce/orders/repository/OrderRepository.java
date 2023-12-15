package com.ecommerce.orders.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.orders.model.Order;

public interface OrderRepository extends JpaRepository<Order, String>{
	
	List<Order> findByProfileId(String profileId);

}
