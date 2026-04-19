package com.ecommerce.shoplite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.shoplite.dto.LoginResponse;
import com.ecommerce.shoplite.dto.RegisterResponse;
import com.ecommerce.shoplite.entity.Provider;
import com.ecommerce.shoplite.entity.Role;
import com.ecommerce.shoplite.entity.User;
import com.ecommerce.shoplite.repository.UserRepository;
import com.ecommerce.shoplite.security.JwtUtil;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;

    public RegisterResponse register(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setRole(Role.USER);
        user.setProvider(Provider.LOCAL);
        User savedUser = userRepository.save(user);
        return new RegisterResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getProvider());

    }

    public LoginResponse login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getProvider(),
                token
            );
    }
}
