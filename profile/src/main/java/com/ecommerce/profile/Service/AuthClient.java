package com.ecommerce.profile.Service;

import com.ecommerce.profile.dto.AuthRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "AUTH-SERVICE")
public interface AuthClient {

	@PostMapping("/auth/token")
	public String getToken(@RequestBody AuthRequest authRequest);
}
