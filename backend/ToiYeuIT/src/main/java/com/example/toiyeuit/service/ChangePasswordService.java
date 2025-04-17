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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

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

        if (! passwordEncoder.matches(request.getCurrentPassword(), user.getPassword()))
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);

        if ( passwordEncoder.matches(request.getNewPassword(), user.getPassword()))
            throw new AppException(ErrorCode.PASS_EXISTED);

        if (!Objects.equals(request.getNewPassword(), request.getConfirmPassword()))
            throw new AppException(ErrorCode.INVALID_CONFIRM_LOGIC);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

}
