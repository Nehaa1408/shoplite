package com.ecommerce.shoplite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.shoplite.dto.GoogleLoginRequest;
import com.ecommerce.shoplite.dto.LoginResponse;
import com.ecommerce.shoplite.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/google")
    public ResponseEntity<LoginResponse> googleLogin(
            @RequestBody GoogleLoginRequest request) {

        return ResponseEntity.ok(userService.googleLogin(request.getToken()));
    }
}