package com.ecommerce.productratingservice.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RatingId implements Serializable {
	private static final long serialVersionUID = 3261524884971266545L;
	private String productId;
	private String userId;
}
