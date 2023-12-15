package com.ecommerce.productratingservice.service;

import java.text.DecimalFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import com.ecommerce.productratingservice.dto.Profile;
import com.ecommerce.productratingservice.dto.RatingDto;
import com.ecommerce.productratingservice.entity.Rating;
import com.ecommerce.productratingservice.exception.ResourceNotFoundException;
import com.ecommerce.productratingservice.repository.RatingRepository;

@Service
public class RatingService {

	@Autowired
	private RatingRepository ratingRepository;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private ModelMapper modelMapper;

	private static final Logger LOGGER = LoggerFactory.getLogger(RatingService.class);
	private static final DecimalFormat DECIMAL_FORMAT = new DecimalFormat("0.00");

	public RatingDto saveRating(RatingDto ratingDto) {
		Rating rating = modelMapper.map(ratingDto, Rating.class);
		rating.setCreatedAt(new Date());

		Profile profile = restTemplate
				.getForEntity("http://profile/api/profile/getById/" + ratingDto.getUserId(), Profile.class).getBody();
		rating.setUserName(profile.getUserName());

		Rating savedRating = ratingRepository.save(rating);
		RatingDto savedRatingDto = modelMapper.map(savedRating, RatingDto.class);
		LOGGER.info("Saved Rating  product: {} by user: {}", rating.getRatingId().getProductId(),
				rating.getRatingId().getUserId());
		return savedRatingDto;
	}

	public Map<String, Object> getRatingByProductId(String productId) {
		int[] array = new int[5];
		List<Rating> ratingList = ratingRepository.findByRatingIdProductId(productId);
		List<RatingDto> ratingDtoList = ratingList.stream().map((rating) -> modelMapper.map(rating, RatingDto.class))
				.collect(Collectors.toList());
		ratingList.stream().mapToInt(rating -> (int) (Math.ceil(rating.getRating())-1))
		.filter(index -> index >= 0 && index < 5).forEach(index -> array[index] += 1);
		Map<String, Object> data = new HashMap<>();
		double totalRating = ratingList.stream().mapToDouble(review -> review.getRating()).sum() / ratingList.size();
		data.put("totalRating", Double.valueOf(DECIMAL_FORMAT.format(totalRating)));
		data.put("review", ratingDtoList);
		data.put("starData", array);
		LOGGER.info("returning List Of Review for  ProductId: {}", productId);
		return data;
	}



	public RatingDto getRatingByUserIdAndProductId(String productId, String userId) throws ResourceNotFoundException {

		Optional<Rating> rating = ratingRepository.findByRatingIdProductIdAndRatingIdUserId(productId, userId);

		if (rating.isPresent()) {
			RatingDto ratingDto = modelMapper.map(rating.get(), RatingDto.class);
			LOGGER.info("returning Review for  ProductId: {} by UserId", productId, userId);
			return ratingDto;
		} else {
			LOGGER.error("Rating Not Found for product: {} by user: {}", productId, userId);
			throw new ResourceNotFoundException("Rating Not Found");
		}
	}

	public RatingDto updateRating(String productId, String userId, RatingDto updatedRatingDto)
			throws ResourceNotFoundException {

		Optional<Rating> rating = ratingRepository.findByRatingIdProductIdAndRatingIdUserId(productId, userId);
		if (rating.isPresent()) {
			Rating updatedRating = modelMapper.map(updatedRatingDto, Rating.class);
			rating.get().setCreatedAt(new Date());
			rating.get().setRating(updatedRating.getRating());
			rating.get().setReview(updatedRating.getReview());
			Rating updatedSavedRating = ratingRepository.save(rating.get());
			LOGGER.info("Updating Rating  product: {} by user: {}", updatedRating.getRatingId().getProductId(),
					updatedRating.getRatingId().getUserId());
			RatingDto updatedSavedRatingDto = modelMapper.map(updatedSavedRating, RatingDto.class);
			return updatedSavedRatingDto;
		} else {
			LOGGER.error("Rating Not Found for product: {} by user: {}", productId, userId);
			throw new ResourceNotFoundException("Rating Not Found");
		}
	}

	public void deleteRating(String productId, String userId) throws ResourceNotFoundException {
		Optional<Rating> rating = ratingRepository.findByRatingIdProductIdAndRatingIdUserId(productId, userId);
		if (rating.isPresent()) {
			ratingRepository.delete(rating.get());
			LOGGER.info("Deleted Rating for product: {} by User: ", productId, userId);
		} else {
			LOGGER.error("Rating Not Found for product: {} by user: {}", productId, userId);
			throw new ResourceNotFoundException("Rating Not Found");
		}

	}

}
