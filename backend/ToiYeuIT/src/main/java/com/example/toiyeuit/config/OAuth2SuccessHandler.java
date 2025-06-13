package com.example.toiyeuit.config;


import com.example.toiyeuit.dto.response.AuthTokenResponse;
import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.enums.PredefinedRole;
import com.example.toiyeuit.repository.RoleRepository;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.service.AuthService;
import com.example.toiyeuit.service.JwtService;
import com.example.toiyeuit.service.RoleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Slf4j
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    UserRepository userRepository;
    private final RoleService roleService;
    private final JwtService jwtService;
    private final AuthService authService;


    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticatedPrincipal principal = (OAuth2AuthenticatedPrincipal) authentication.getPrincipal();

        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");

        log.info("Name: {}", name);
        log.info("Email: {}", email);
/*
        Role role = roleService.findRoleByName(PredefinedRole.USER);

        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    return userRepository.save(
                            User.builder()
                                    .username(name)
                                    .email(email)
                                    .role(role)
                                    .build()
                    );
                });
        String token = jwtService.generateToken(user, false);

        response.addCookie(authService.setCookie("jwt", token));

        var authToken =  AuthTokenResponse.builder()
                .role(user.getRole().getName())
                .token(token)
                .build();

        response.getWriter().write(new ObjectMapper().writeValueAsString(authToken));*/
    }
}
