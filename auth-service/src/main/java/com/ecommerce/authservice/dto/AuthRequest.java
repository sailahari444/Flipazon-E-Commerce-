package com.ecommerce.authservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(
        description = "AuthRequest Model Information"
)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {

    @Schema(
            description = "Username of user"
    )
    private String username;
    @Schema(
            description = "Password of user"
    )
    private String password;

}
