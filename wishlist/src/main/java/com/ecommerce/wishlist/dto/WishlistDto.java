package com.ecommerce.wishlist.dto;

import com.ecommerce.wishlist.constants.WishlistDtoConstants;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Schema(
        description = WishlistDtoConstants.WISHLIST_DTO_DESCRIPTION
)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WishlistDto {

    @Schema(
            description = WishlistDtoConstants.WISHLIST_ID_DESCRIPTION
    )
    private String wishlistId;

    @Schema(
            description = WishlistDtoConstants.PROFILE_ID_DESCRIPTION
    )
    private String profileId;

    @Schema(
            description = WishlistDtoConstants.PRODUCT_ID_DESCRIPTION
    )
    private String productId;

    @Schema(
            description = WishlistDtoConstants.WISHLIST_NAME_DESCRIPTION
    )
    private String wishlistName;
}
