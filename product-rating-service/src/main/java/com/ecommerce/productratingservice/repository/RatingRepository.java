package com.ecommerce.productratingservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.productratingservice.entity.Rating;
import com.ecommerce.productratingservice.entity.RatingId;

@Repository
public interface RatingRepository extends JpaRepository<Rating, RatingId> {
	
	List<Rating> findByRatingIdProductId(String productId);
	Optional<Rating> findByRatingIdProductIdAndRatingIdUserId(String productId, String userId);

}
