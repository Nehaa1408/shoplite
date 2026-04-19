package com.ecommerce.shoplite.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long orderId;
    private double totalAmount;
    private String status;
    private List<OrderItemResponse> items;
}