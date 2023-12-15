package com.ecommerce.wishlist.constants;

public final class WishlistControllerConstants {

    public static final String TAG_NAME="CRUD REST API for Wishlist";
    public static final String CONTROLLER_DESCRIPTION="Functionality provided -\n1. Create a new wishlist\n2. Add product to an existing wishlist\n3. Get a wishlist by wishlist id\n4. Get the id's and names of all wishlists for a given profile id\n5. Delete a product from the wishlist\n6. Delete a wishlist by the wishlist id";

    public static final String CREATE_WISHLIST_SUMMARY="Create a new wishlist for a user";
    public static final String CREATE_WISHLIST_DESCRIPTION="This endpoint is used to create a new wishlist for a user, by taking the user's id and a wishlist name as input";
    public static final String ADD_PRODUCT_TO_WISHLIST_SUMMARY="Adds a product to user's wishlist";
    public static final String ADD_PRODUCT_TO_WISHLIST_DESCRIPTION="This endpoint is used to add a product to a user's wishlist, by taking the wishlist id and product id as input";
    public static final String GET_WISHLIST_BY_WISHLIST_ID_SUMMARY="Fetches all the items in a user's wishlist";
    public static final String GET_WISHLIST_BY_WISHLIST_ID_DESCRIPTION="This endpoint is used to fetch all the products in a user's wishlist, by taking the wishlist id as input";
    public static final String GET_WISHLIST_IDS_AND_NAMES_SUMMARY="Gets the wishlist id's and names of all wishlists created by a user";
    public static final String GET_WISHLIST_IDS_AND_NAMES_DESCRIPTION="This endpoint is used to fetch the wishlist id's and names of all wishlists created by a user, by taking profile id as input";
    public static final String DELETE_PRODUCT_FROM_WISHLIST_SUMMARY="Deletes a product from a user's wishlist";
    public static final String DELETE_PRODUCT_FROM_WISHLIST_DESCRIPTION="This endpoint is used to delete a product from a user's wishlist, by taking the wishlist id and product id as input";
    public static final String DELETE_WISHLIST_SUMMARY="Delete the entire wishlist for a user";
    public static final String DELETE_WISHLIST_DESCRIPTION="This endpoint is used to delete a the entire wishlist for a user, by taking the wishlist id as input";

    public static final String SUCCESS_CODE="200";
    public static final String CREATED_CODE="201";

    public static final String SUCCESS_DESCRIPTION="HTTP Status 200 SUCCESS";
    public static final String CREATED_DESCRIPTION="HTTP Status 201 CREATED";
}
