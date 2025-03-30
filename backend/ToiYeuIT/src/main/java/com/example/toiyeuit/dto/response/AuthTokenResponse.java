package com.example.toiyeuit.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthTokenResponse {
   String token;
   String role;
}
