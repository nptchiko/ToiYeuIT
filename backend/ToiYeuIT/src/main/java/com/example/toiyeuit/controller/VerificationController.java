package com.example.toiyeuit.controller;


import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.service.VerificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/verify")
@AllArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    @GetMapping("/confirm")
    public ApiResponse<?> confirm(@RequestParam("token") String token){
        return ApiResponse.builder()
                .code(200)
                .message(verificationService.confirmToken(token))
                .build();
    }
}
