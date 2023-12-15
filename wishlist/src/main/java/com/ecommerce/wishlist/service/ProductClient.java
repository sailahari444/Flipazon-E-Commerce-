package com.ecommerce.wishlist.service;

import com.ecommerce.wishlist.entity.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name="PRODUCT")
public interface ProductClient {

    @PostMapping("/api/products/productsById")
    public List<Product> getProductsById(@RequestBody List<String> productRequest);
}
