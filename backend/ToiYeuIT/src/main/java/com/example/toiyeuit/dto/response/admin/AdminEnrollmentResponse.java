package com.example.toiyeuit.dto.response.admin;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminEnrollmentResponse {
    String username;
    String email;
    String courseTitle;
    long courseId;
    Double price;
}
