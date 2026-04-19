package com.ecommerce.shoplite.dto;

import com.ecommerce.shoplite.entity.Provider;
import com.ecommerce.shoplite.entity.Role;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class RegisterResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private Provider provider;
}
