package com.ecommerce.profile.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(description = "Fields of ChangePasswordDto Model")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDto {
    @Schema(description = "Email of the user")
    private String email;

    @Schema(description = "Old password of the user")
    private String oldPassword;

    @Schema(description = "New password of the user")
    private String newPassword;
}
