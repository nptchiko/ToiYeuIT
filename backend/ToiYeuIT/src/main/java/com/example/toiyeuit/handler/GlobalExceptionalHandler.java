package com.example.toiyeuit.handler;


import com.example.toiyeuit.dto.response.ApiResponse;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.nio.file.AccessDeniedException;


// Auto bat exception roi tra ve client, khong can den try catch
@Slf4j
@RestControllerAdvice
public class GlobalExceptionalHandler {
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<?> handlingGeneralException(Exception ex){
        log.error(ex.getMessage());
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<?> handlingRuntime(RuntimeException e){
        log.error(e.getMessage());
        return ResponseEntity.badRequest().body(e.getMessage());
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
}
