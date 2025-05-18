package com.example.toiyeuit.exception;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AppException extends RuntimeException{

    private ErrorCode errorCode;
    private String message;

    public AppException(ErrorCode errorCode){
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}
