package com.ecommerce.shoplite.controller;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.shoplite.dto.LoginRequest;
import com.ecommerce.shoplite.dto.LoginResponse;
import com.ecommerce.shoplite.dto.RegisterResponse;
import com.ecommerce.shoplite.entity.User;
import com.ecommerce.shoplite.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request.getEmail(), request.getPassword());
    }

}
