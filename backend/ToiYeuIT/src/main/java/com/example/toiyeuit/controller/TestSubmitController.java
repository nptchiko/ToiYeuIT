package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.testSubmit.TestSubmitRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.service.TestSubmitService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("api/tests")
public class TestSubmitController {

    TestSubmitService service;

    @PostMapping("/submit")
    public ApiResponse<?> submit(@RequestBody @Valid TestSubmitRequest request){
        service.submitTest(request);

        return ApiResponse.builder()
                .code(200)
                .message("Submit successfully")
                .build();
    }
}
