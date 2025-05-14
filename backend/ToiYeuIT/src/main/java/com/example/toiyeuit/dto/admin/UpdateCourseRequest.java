package com.example.toiyeuit.dto.admin;


import com.example.toiyeuit.enums.CourseType;
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
public class UpdateCourseRequest {
    String title;
    String description;
    String level;
    int duration;
    Double price;
    CourseType type;
    String tag;
    boolean enabled;
}
