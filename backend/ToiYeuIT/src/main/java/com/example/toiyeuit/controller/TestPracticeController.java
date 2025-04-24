package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.request.testSubmit.TestSubmitRequest;
import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.TestDetailsResponse;
import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.service.test.TestCollectionService;
import com.example.toiyeuit.service.test.TestResultService;
import com.example.toiyeuit.service.test.TestSubmitService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-practice")
@AllArgsConstructor
public class TestPracticeController {

    private final TestCollectionService testsService;
    private final TestSubmitService service;
    private final TestResultService resultService;
    @GetMapping
    public ApiResponse<List<TestSetResponse>> tests(){
        var result = testsService.getAll();
        return ApiResponse.<List<TestSetResponse>>builder()
                .code(200)
                .message("Successfully")
                .body(result)
                .build();
    }
    @GetMapping("/{skill}")
    public ApiResponse<List<TestSetResponse>> testBasedOnSkill(@PathVariable("skill") String skill){

        var result = testsService.getTestSetBasedOnSkill(skill);

        return ApiResponse.<List<TestSetResponse>>builder()
                .code(200)
                .message("Successfully")
                .body(result)
                .build();
    }

    @PostMapping("/submit")
    public ApiResponse<?> submit(@RequestBody @Valid TestSubmitRequest request){
        service.submitTest(request);

        return ApiResponse.builder()
                .code(200)
                .message("Submit successfully")
                .build();
    }

    @GetMapping("/history/{testId}")
    public ApiResponse<TestDetailsResponse> history(@PathVariable("testId") int testId){
        var body = resultService.retrieveTestResult(testId);
        return ApiResponse.<TestDetailsResponse>builder()
                .code(200)
                .message("Chan vai lozz")
                .body(body)
                .build();
    }
}
