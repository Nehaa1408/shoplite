package com.ecommerce.shoplite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.shoplite.entity.Order;
import com.ecommerce.shoplite.repository.UserRepository;
import com.ecommerce.shoplite.security.JwtUtil;
import com.ecommerce.shoplite.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    private Long getUserIdFromToken(String token) {
        token = token.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping("/place")
    public Order placeOrder(@RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        return orderService.placeOrder(userId);
    }
}