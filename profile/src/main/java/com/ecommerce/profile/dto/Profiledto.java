package com.ecommerce.profile.dto;

import java.util.List;

import com.ecommerce.profile.Entity.Address;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Schema(description = "Fields of Profiledto Model")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profiledto {

	@Schema(description = "Profile id")
	private String profileId;

	@Schema(description = "Profile User Name")
	@NotEmpty(message = "User Name should not be empty")
	private String userName;

	@Schema(description = "Profile User Gender")
	private String userGender;

	@Schema(description = "Profile User Email")
	@NotEmpty(message = "User email should not be empty")
	@Email
	private String userEmail;

	@Schema(description = "Profile User Mobile Number")
	private String userMobNo;

	@Schema(description = "Profile User Password")
	private String userPassword;

	@Schema(description = "Address Object")
	private List<Address> address;

}
