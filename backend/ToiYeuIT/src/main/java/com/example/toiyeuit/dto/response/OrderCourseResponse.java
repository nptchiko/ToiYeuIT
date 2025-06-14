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
    private String status;
    private String paymentMethod;
    private LocalDateTime createdAt;
}
