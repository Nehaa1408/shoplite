package com.ecommerce.shoplite.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.shoplite.entity.Product;
import com.ecommerce.shoplite.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public org.springframework.data.domain.Page<Product> getProducts(int page, int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);

        return productRepository.findAll(pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        productRepository.delete(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        if (updatedProduct.getName() != null) {
            product.setName(updatedProduct.getName());
        }

        if (updatedProduct.getDescription() != null) {
            product.setDescription(updatedProduct.getDescription());
        }

        if (updatedProduct.getPrice() != 0) {
            product.setPrice(updatedProduct.getPrice());
        }

        if (updatedProduct.getQuantity() >= 0) {
            product.setQuantity(updatedProduct.getQuantity());
        }

        if (updatedProduct.getImageUrl() != null) {
            product.setImageUrl(updatedProduct.getImageUrl());
        }

        return productRepository.save(product);
    }
}