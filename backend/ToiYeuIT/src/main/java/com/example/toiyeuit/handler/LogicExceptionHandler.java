package com.example.toiyeuit.handler;

import com.example.toiyeuit.exception.UserServiceLogicException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class LogicExceptionHandler {

    @ExceptionHandler(UserServiceLogicException.class)
    public ResponseEntity<?> userServiceLogicException(UserServiceLogicException userServiceLogicException) {
        return new ResponseEntity<>(userServiceLogicException.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
