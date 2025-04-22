package com.example.toiyeuit.controller;


import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.entity.Question;
import com.example.toiyeuit.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@AllArgsConstructor
public class QuestionController {

    QuestionRepository questionRepository;

    @GetMapping
    public ApiResponse<List<Question>> getAll(){
        return ApiResponse.<List<Question>>builder()
                .code(200)
                .message("all questions")
                .body(questionRepository.findAll())
                .build();
    }

}
