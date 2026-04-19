package com.ecommerce.shoplite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shoplite.entity.Cart;
import com.ecommerce.shoplite.entity.Product;
import com.ecommerce.shoplite.entity.User;
import com.ecommerce.shoplite.repository.CartRepository;
import com.ecommerce.shoplite.repository.ProductRepository;
import com.ecommerce.shoplite.repository.UserRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addItem(Long userId, Long productId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<Cart> userCart = cartRepository.findByUser(user);

        for (Cart item : userCart) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(item.getQuantity() + 1);
                return cartRepository.save(item);
            }
        }

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(1);

        return cartRepository.save(cart);
    }

    public List<Cart> getCart(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cartRepository.findByUser(user);
    }

    public Cart updateQuantity(Long userId, Long productId, int quantity) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Cart> userCart = cartRepository.findByUser(user);

        for (Cart item : userCart) {
            if (item.getProduct().getId().equals(productId)) {
                item.setQuantity(quantity);
                return cartRepository.save(item);
            }
        }

        throw new RuntimeException("Product not in cart");
    }

    public void removeItem(Long userId, Long productId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        cartRepository.deleteByUserAndProductId(user, productId);
    }

    public void clearCart(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        cartRepository.deleteByUser(user);
    }
}