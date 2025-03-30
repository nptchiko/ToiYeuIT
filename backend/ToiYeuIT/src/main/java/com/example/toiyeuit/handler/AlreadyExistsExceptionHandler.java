package com.example.toiyeuit.handler;


import com.example.toiyeuit.exception.AlreadyExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AlreadyExistsExceptionHandler {

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<?> AlreadyExistsException(AlreadyExistsException alreadyExistsException) {
        return new ResponseEntity<>(alreadyExistsException.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
