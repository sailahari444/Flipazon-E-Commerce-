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


@Schema(description = "Fields of Address Entity ")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
	
	@Id
	@GeneratedValue
	@UuidGenerator(style = UuidGenerator.Style.TIME)
	private String addressId;
	
	@Column(name = "profile_id", nullable = false)
	private String profileId;
	
	@Column(name = "house_no", nullable = false)
	private String houseNo;
	
	@Column(name = "street", nullable = false)
	private String street;
	
	@Column(name = "locality", nullable = false)
	private String locality;
	
	@Column(name = "city", nullable = false)
	private String city;
	
	@Column(name = "state", nullable = false)
	private String state;
	
	@Column(name = "pincode", nullable = false)
	private int pincode;
	
}
