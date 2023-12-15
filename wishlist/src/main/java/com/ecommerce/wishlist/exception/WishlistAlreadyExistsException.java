package com.ecommerce.wishlist.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class WishlistAlreadyExistsException extends RuntimeException{
    public WishlistAlreadyExistsException(String message){
        super(message);
    }
}
