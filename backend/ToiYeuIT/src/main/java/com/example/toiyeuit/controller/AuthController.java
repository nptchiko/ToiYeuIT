package com.example.toiyeuit.controller;


import com.example.toiyeuit.dto.request.LoginRequest;
import com.example.toiyeuit.dto.request.LogoutRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.AuthTokenResponse;
import com.example.toiyeuit.service.AuthService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("api/auth/")
public class AuthController {

    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ApiResponse<AuthTokenResponse> login(@RequestBody LoginRequest request){
        var result = authService.authenticate(request);

        return ApiResponse.<AuthTokenResponse>builder()
                .code(HttpStatus.CREATED.value())
                .body(result)
                .message("Authenticated successfully")
                .build();
    }
    @PostMapping("/logout")
    public ApiResponse<?> logout(@Valid @RequestBody LogoutRequest logoutRequest) throws ParseException, JOSEException {
       var result = authService.logout(logoutRequest);

       return ApiResponse.builder()
               .code(200)
               .message(result)
               .build();
    }
}
