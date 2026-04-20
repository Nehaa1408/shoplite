package com.ecommerce.shoplite.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ecommerce.shoplite.security.JwtFilter;

@Configuration
public class SecurityConfig {

        @Autowired
        private JwtFilter jwtFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                http
                                .csrf(csrf -> csrf.disable())

                                .authorizeHttpRequests(auth -> auth
                                                // AUTH
                                                .requestMatchers("/api/auth/**").permitAll()

                                                // PRODUCTS
                                                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")

                                                // ORDERS
                                                .requestMatchers(HttpMethod.PUT, "/orders/*/status").hasRole("ADMIN")
                                                .requestMatchers("/orders/admin/**").hasRole("ADMIN")

                                                // TICKETS
                                                .requestMatchers("/tickets/admin").hasRole("ADMIN")
                                                .requestMatchers(HttpMethod.PUT, "/tickets/**").hasRole("ADMIN")

                                                // EVERYTHING ELSE
                                                .anyRequest().authenticated())

                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(
                                                                org.springframework.security.config.http.SessionCreationPolicy.STATELESS))

                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}