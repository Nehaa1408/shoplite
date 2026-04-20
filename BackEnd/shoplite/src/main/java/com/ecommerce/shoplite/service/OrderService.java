package com.ecommerce.shoplite.service;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shoplite.dto.OrderItemResponse;
import com.ecommerce.shoplite.dto.OrderResponse;
import com.ecommerce.shoplite.entity.*;

import com.ecommerce.shoplite.entity.User;
import com.ecommerce.shoplite.repository.CartRepository;
import com.ecommerce.shoplite.repository.OrderRepository;
import com.ecommerce.shoplite.repository.ProductRepository;
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

    @Autowired
    private ProductRepository productRepository;

    // PLACE ORDER
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
        order.setStatus(OrderStatus.PLACED);

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

        return mapToResponse(savedOrder);
    }

    // USER ORDERS
    public List<OrderResponse> getUserOrders(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Order> orders = orderRepository.findByUserOrderByOrderDateDesc(user);

        List<OrderResponse> responseList = new ArrayList<>();

        for (Order order : orders) {
            responseList.add(mapToResponse(order));
        }

        return responseList;
    }

    // GET ORDER BY ID
    public OrderResponse getOrderById(Long userId, Long orderId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findByIdAndUser(orderId, user)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToResponse(order);
    }

    // UPDATE STATUS (ADMIN)
    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        OrderStatus enumStatus;
        try {
            enumStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (Exception e) {
            throw new RuntimeException("Invalid status value");
        }

        order.setStatus(enumStatus);

        Order updated = orderRepository.save(order);

        return mapToResponse(updated);
    }

    // ADMIN → GET ALL ORDERS
    public List<OrderResponse> getAllOrders() {

        List<Order> orders = orderRepository.findAll();

        List<OrderResponse> response = new ArrayList<>();

        for (Order order : orders) {
            response.add(mapToResponse(order));
        }

        return response;
    }

    // ADMIN DASHBOARD STATS
    public Map<String, Long> getAdminStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("users", userRepository.count());
        stats.put("orders", orderRepository.count());
        stats.put("products", productRepository.count());

        return stats;
    }

    // 🔧 COMMON MAPPER
    private OrderResponse mapToResponse(Order order) {

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
        response.setStatus(order.getStatus().name());
        response.setItems(itemResponses);

        return response;
    }
}