package com.example.toiyeuit.dto.response;

import com.example.toiyeuit.entity.test.Test;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TestSetResponse {
    Integer id;
    String title;
    String description;
    String skill;
    Set<Test> tests;
}
