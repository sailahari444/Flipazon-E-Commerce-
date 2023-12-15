package com.ecommerce.profile.Entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

@Schema(description = "Fields of Profile Entity ")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {

	@Id
	@GeneratedValue
	@UuidGenerator(style = UuidGenerator.Style.TIME)
	private String profileId;

	@Column(name = "user_name", nullable = false)
	private String userName;

	@Column(name = "user_gender", nullable = false)
	private String userGender;

	@Column(name = "user_email", nullable = false)
	private String userEmail;

	@Column(name = "user_mob_no", nullable = false)
	private String userMobNo;

	@Column(name = "user_password", nullable = false)
	private String userPassword;
}
