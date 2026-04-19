package com.ecommerce.shoplite.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shoplite.entity.*;
import com.ecommerce.shoplite.repository.*;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Cart> cartItems = cartRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        List<OrderItem> orderItems = new ArrayList<>();
        double total = 0;

        for (Cart cart : cartItems) {

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(cart.getProduct());
            item.setQuantity(cart.getQuantity());
            item.setPrice(cart.getProduct().getPrice());

            total += cart.getQuantity() * cart.getProduct().getPrice();

            orderItems.add(item);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        cartRepository.deleteByUser(user);

        return savedOrder;
    }
}