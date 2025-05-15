package com.example.toiyeuit.dto.admin;


import com.example.toiyeuit.enums.CourseType;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.annotation.Nullable;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CrudCourseRequest {
    String title;
    String description;
    String level;
    int duration;
    Double price;
    String tag;
    boolean enabled;

    @Nullable
    CourseType type;
}
