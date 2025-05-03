package com.example.toiyeuit.dto.request;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class OrderCourseRequest {
   private Integer courseId;
//   private Long userId;
   private String status;
   private String paymentMethod;
}
