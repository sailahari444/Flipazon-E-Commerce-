package com.ecommerce.productratingservice.dto;

import java.util.Date;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "UserDto Model Information")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class RatingDto {

	private String productId;
	private String userId;
	private String userName;
	private float rating;
	@NotBlank
	private String review;
	private Date createdAt;

}
