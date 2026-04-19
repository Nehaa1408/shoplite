package com.ecommerce.shoplite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.shoplite.entity.Order;
import com.ecommerce.shoplite.entity.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
}