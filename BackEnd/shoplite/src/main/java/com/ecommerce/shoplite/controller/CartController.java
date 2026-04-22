package com.ecommerce.shoplite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.shoplite.dto.CartResponse;
import com.ecommerce.shoplite.repository.UserRepository;
import com.ecommerce.shoplite.security.JwtUtil;
import com.ecommerce.shoplite.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    private Long getUserIdFromToken(String token) {
        token = token.replace("Bearer ", "");
        String email = jwtUtil.extractEmail(token);

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"))
                .getId();
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        return ResponseEntity.ok(cartService.addItem(userId, productId, quantity));
    }

    @GetMapping
    public ResponseEntity<List<CartResponse>> getCart(
            @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateQuantity(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        return ResponseEntity.ok(
                cartService.updateQuantity(userId, productId, quantity));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeItem(
            @RequestParam Long productId,
            @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        cartService.removeItem(userId, productId);

        return ResponseEntity.ok("Item removed");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(
            @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        cartService.clearCart(userId);

        return ResponseEntity.ok("Cart cleared");
    }
}