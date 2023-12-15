package com.ecommerce.wishlist.dto;

import com.ecommerce.wishlist.constants.WishlistDtoConstants;
import com.ecommerce.wishlist.entity.Product;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Schema(
        description = WishlistDtoConstants.DETAILED_WISHLIST_DTO_DESCRIPTION
)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DetailedWishlistDto {

    @Schema(
            description = WishlistDtoConstants.PROFILE_ID_DESCRIPTION
    )
    private String profileId;

    @Schema(
            description = WishlistDtoConstants.PRODUCT_LIST_DESCRIPTION
    )
    private List<Product> products;

    @Schema(
            description = WishlistDtoConstants.WISHLIST_ID_DESCRIPTION
    )
    private String wishlistId;

    @Schema(
            description = WishlistDtoConstants.WISHLIST_NAME_DESCRIPTION
    )
    private String wishlistName;
}
