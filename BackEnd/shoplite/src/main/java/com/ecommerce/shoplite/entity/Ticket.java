package com.ecommerce.shoplite.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private String message;
    private String status; 

    @ManyToOne
    private User user;
}