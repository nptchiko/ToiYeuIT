package com.example.toiyeuit.exception;

public class UserAlreadyExistsException extends AppException {
    public UserAlreadyExistsException(){
        super(ErrorCode.USER_EXISTED);
    }
}
