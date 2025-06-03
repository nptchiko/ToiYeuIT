package com.example.toiyeuit.dto.response.admin;


import com.example.toiyeuit.dto.response.PaginationResponse;
import com.example.toiyeuit.dto.response.UserResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AdminUsersResponse {
    List<UserResponse> users;
    PaginationResponse pagination;
}
