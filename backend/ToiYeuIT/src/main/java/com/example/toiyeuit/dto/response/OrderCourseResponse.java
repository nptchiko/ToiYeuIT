package com.example.toiyeuit.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderCourseResponse {
    private Integer courseId;
    private Long userId;
    private String status;
    private String paymentMethod;
    private LocalDateTime createdAt;
}
