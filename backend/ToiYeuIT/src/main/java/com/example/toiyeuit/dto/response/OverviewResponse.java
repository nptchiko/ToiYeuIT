package com.example.toiyeuit.dto.response;


import com.example.toiyeuit.entity.course.Course;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OverviewResponse {
    List<Course> courses;
    List<TestResponse> tests;
}
