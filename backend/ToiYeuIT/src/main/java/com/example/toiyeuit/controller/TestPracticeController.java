package com.example.toiyeuit.controller;

import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.entity.TestCollection;
import com.example.toiyeuit.mapper.TestSetMapper;
import com.example.toiyeuit.repository.TestCollectionRepository;
import com.example.toiyeuit.service.TestCollectionService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/test-practice")
@AllArgsConstructor
public class TestPracticeController {

    private final TestCollectionService testsService;

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
}
