package com.ecommerce.productratingservice.entity;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
@Getter
public class Rating {
	@EmbeddedId
	private RatingId ratingId;
	private String userName;
	private float rating;
	@Column(columnDefinition = "TEXT")
	private String review;
	private Date createdAt;
}
