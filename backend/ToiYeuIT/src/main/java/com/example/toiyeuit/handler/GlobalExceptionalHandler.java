package com.example.toiyeuit.handler;


import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;


// Auto bat exception roi tra ve client, khong can den try catch
@Hidden
@Slf4j
@RestControllerAdvice
public class GlobalExceptionalHandler {

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(value = RuntimeException.class)
    ApiResponse<?> handlingRuntime(RuntimeException e){
        log.error("Message from runtime: " + e.getMessage());
        log.error("Where it from: " + e);
        return ApiResponse.builder()
                .code(500)
                .message("Internal Server Error")
                .build();
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<?>> handlingAppException(AppException e){
        log.error(e.getMessage());
        ErrorCode errorCode = e.getErrorCode();

        return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build());
    }

    @ExceptionHandler(value = NoResourceFoundException.class)
    ResponseEntity<ApiResponse<?>> handlingNoHandler(NoResourceFoundException ex){

        ErrorCode errorCode = ErrorCode.RESOURCE_NOT_FOUND;
        log.error(errorCode
                .getMessage());
        return ResponseEntity.badRequest()
                .body(ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build());
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ApiResponse<?> handlingAccessDeniedException(AccessDeniedException e)
    {
        log.error(e.getMessage());
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

        return ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
    }

    @ExceptionHandler(value = MessagingException.class)
    ResponseEntity<ApiResponse<?>> handlingEmailException(MessagingException e){
        log.error(e.getMessage());

        ErrorCode errorCode = ErrorCode.INVALID_EMAIL_DELIVERY;
        return ResponseEntity.badRequest().body(ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build()
        );
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<?> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        log.error(ex.getMessage());
        return ApiResponse.builder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message("Request parameters is not valid")
                .body(errors)
                .build();
    }
}
