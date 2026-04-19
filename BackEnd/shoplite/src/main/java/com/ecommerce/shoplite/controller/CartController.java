package com.ecommerce.shoplite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.shoplite.entity.Cart;
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
    public Cart addToCart(@RequestParam Long productId,
                         @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        return cartService.addItem(userId, productId);
    }

 
    @GetMapping
    public List<Cart> getCart(@RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        return cartService.getCart(userId);
    }

    
    @PutMapping("/update")
    public Cart updateQuantity(@RequestParam Long productId,
                              @RequestParam int quantity,
                              @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        return cartService.updateQuantity(userId, productId, quantity);
    }

   
    @DeleteMapping("/remove")
    public String removeItem(@RequestParam Long productId,
                            @RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        cartService.removeItem(userId, productId);
        return "Item removed";
    }

    
    @DeleteMapping("/clear")
    public String clearCart(@RequestHeader("Authorization") String token) {

        Long userId = getUserIdFromToken(token);
        cartService.clearCart(userId);
        return "Cart cleared";
    }
}