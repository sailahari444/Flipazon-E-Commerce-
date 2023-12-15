package com.ecommerce.productratingservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

	private String profileId;

	private String userName;

	private String userGender;

	private String userEmail;

	private String userMobNo;
}
