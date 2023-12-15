package com.ecommerce.profile.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "Fields of AuthRequest Model")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    @Schema(description = "Email of the user used to uniquely identify the user")
    private String username;

    @Schema(description = "Password of the user")
    private String password;
}
