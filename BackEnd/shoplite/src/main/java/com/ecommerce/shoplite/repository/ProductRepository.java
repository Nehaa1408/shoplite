package com.ecommerce.shoplite.repository;

import com.ecommerce.shoplite.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByBrand(String brand);

    Page<Product> findByBrandAndType(String brand, String type, Pageable pageable);

    Page<Product> findByCategory_Name(String categoryName, Pageable pageable);

    Page<Product> findByType(String type, Pageable pageable);
}