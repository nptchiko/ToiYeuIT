package com.example.toiyeuit.dto.response;

import lombok.*;

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
}
