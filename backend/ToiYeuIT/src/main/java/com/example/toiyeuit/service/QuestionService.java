package com.example.toiyeuit.service;


import com.example.toiyeuit.dto.response.QuestionResponse;
import com.example.toiyeuit.entity.question.Question;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.QuestionRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Set;

@AllArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class QuestionService {

    QuestionRepository questionRepository;

    public Set<QuestionResponse> questionsInTest(Long testId, Integer part) {
        return null;
    }

    public Question getById(Long id) {
        return questionRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.QUESTION_NOT_FOUND)
        );
    }
}