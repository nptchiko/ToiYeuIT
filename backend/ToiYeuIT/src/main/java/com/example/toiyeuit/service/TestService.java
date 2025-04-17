package com.example.toiyeuit.service;

import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.TestRepository;
import jakarta.persistence.FieldResult;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestService {

    TestRepository testRepository;

    public Test getByID(Long id){
        return testRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.TEST_NOT_FOUND)
        );
    }


}
