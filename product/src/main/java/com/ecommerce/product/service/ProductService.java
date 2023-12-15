package com.ecommerce.product.service;

import com.ecommerce.product.entity.Product;
import com.ecommerce.product.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;
    private static final Logger LOGGER= LoggerFactory.getLogger(ProductService.class);

    public Product saveProduct(Product product){

        LOGGER.info("Saving the product in the database");
        return repository.save(product);
    }

    public List<Product> saveProducts(List<Product> products){

        LOGGER.info("Saving multiple products in the database");
        return (List<Product>) repository.saveAll(products);
    }

    public List<Product> getProducts(){

        LOGGER.info("Retrieving a list of products from the database");
        return repository.findAll().stream().toList();
    }

    public Product getProductById(String id){

        LOGGER.info("Retrieving a product by Id from the database");
        return repository.findById(id).get();
    }

    public String deleteProduct(String id){

        LOGGER.info("Deleting product from the database");
        repository.deleteById(id);
        return "Product Removed." +id;
    }

    public Product updateProduct(Product product){

        LOGGER.info("Updating the product in the database");
        Product prod = repository.findById(product.getProductId()).get();
        prod.setProductName(product.getProductName());
        prod.setProductDescription(product.getProductDescription());
        prod.setProductImageUrl(product.getProductImageUrl());
        prod.setProductPrice((product.getProductPrice()));
        return repository.save(prod);
    }

}
