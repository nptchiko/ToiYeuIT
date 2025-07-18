package com.example.toiyeuit.service;


import com.example.toiyeuit.dto.request.ChangePasswordRequest;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChangePasswordService {

    PasswordEncoder passwordEncoder;
    UserRepository userRepository;

    @Transactional
    public void changePassword(ChangePasswordRequest request){
        //String email = SecurityUtils.getCurrentUserLogin()
        //        .orElseThrow(() -> new AppException(ErrorCode.INVALID_EMAIL));
        String email = request.getEmail();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        if (request.getOldPassword() != null
                && !passwordEncoder.matches(request.getOldPassword(), user.getPassword()))
            throw new RuntimeException("Old password was wrong");
        if ( passwordEncoder.matches(request.getNewPassword(), user.getPassword()))
            throw new AppException(ErrorCode.PASS_EXISTED);

        if (!request.getNewPassword().equals(request.getConfirmPassword()))
            throw new AppException(ErrorCode.INVALID_CONFIRM_LOGIC);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setStatus(true);
        userRepository.save(user);
    }

}
