package com.example.toiyeuit.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderCourseResponse {
    private String courseTitle;
    private String username;
    private String email;
    private String status;
    private String paymentMethod;
    private LocalDateTime createdAt;
    private Double cost;
}
