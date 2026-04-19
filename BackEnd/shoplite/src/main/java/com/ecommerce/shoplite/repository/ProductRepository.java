package com.ecommerce.shoplite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.shoplite.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {

}
