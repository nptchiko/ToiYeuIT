package com.example.toiyeuit.dto.admin;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminTestResponse {
    int testSetId;
    long testId;
    String testSet;
    String name;
    int duration;
    int questions;
    String status;


}
