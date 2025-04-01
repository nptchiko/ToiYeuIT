package com.example.toiyeuit.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CourseRequestDTO {

    private String title;
    private String description;
    private String level;
    private BigDecimal price;
    private Boolean enabled;
    private Integer duration;
}
