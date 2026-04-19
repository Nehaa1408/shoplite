package com.ecommerce.shoplite.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shoplite.dto.OrderItemResponse;
import com.ecommerce.shoplite.dto.OrderResponse;
import com.ecommerce.shoplite.entity.Cart;
import com.ecommerce.shoplite.entity.Order;
import com.ecommerce.shoplite.entity.OrderItem;
import com.ecommerce.shoplite.entity.User;
import com.ecommerce.shoplite.repository.CartRepository;
import com.ecommerce.shoplite.repository.OrderRepository;
import com.ecommerce.shoplite.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public OrderResponse placeOrder(Long userId) {

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

        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItem item : savedOrder.getItems()) {
            OrderItemResponse dto = new OrderItemResponse();
            dto.setProductName(item.getProduct().getName());
            dto.setPrice(item.getPrice());
            dto.setQuantity(item.getQuantity());
            itemResponses.add(dto);
        }

        OrderResponse response = new OrderResponse();
        response.setOrderId(savedOrder.getId());
        response.setTotalAmount(savedOrder.getTotalAmount());
        response.setStatus(savedOrder.getStatus());
        response.setItems(itemResponses);

        return response;
    }

    public List<OrderResponse> getUserOrders(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findByUserOrderByOrderDateDesc(user);

        List<OrderResponse> responseList = new ArrayList<>();

        for (Order order : orders) {

            List<OrderItemResponse> itemResponses = new ArrayList<>();

            for (OrderItem item : order.getItems()) {
                OrderItemResponse dto = new OrderItemResponse();
                dto.setProductName(item.getProduct().getName());
                dto.setPrice(item.getPrice());
                dto.setQuantity(item.getQuantity());
                itemResponses.add(dto);
            }

            OrderResponse response = new OrderResponse();
            response.setOrderId(order.getId());
            response.setTotalAmount(order.getTotalAmount());
            response.setStatus(order.getStatus());
            response.setItems(itemResponses);

            responseList.add(response);
        }

        return responseList;
    }

    public OrderResponse getOrderById(Long userId, Long orderId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findByIdAndUser(orderId, user)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItem item : order.getItems()) {
            OrderItemResponse dto = new OrderItemResponse();
            dto.setProductName(item.getProduct().getName());
            dto.setPrice(item.getPrice());
            dto.setQuantity(item.getQuantity());
            itemResponses.add(dto);
        }

        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setTotalAmount(order.getTotalAmount());
        response.setStatus(order.getStatus());
        response.setItems(itemResponses);

        return response;
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        Order updated = orderRepository.save(order);

        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItem item : updated.getItems()) {
            OrderItemResponse dto = new OrderItemResponse();
            dto.setProductName(item.getProduct().getName());
            dto.setPrice(item.getPrice());
            dto.setQuantity(item.getQuantity());
            itemResponses.add(dto);
        }

        OrderResponse response = new OrderResponse();
        response.setOrderId(updated.getId());
        response.setTotalAmount(updated.getTotalAmount());
        response.setStatus(updated.getStatus());
        response.setItems(itemResponses);

        return response;
    }
}