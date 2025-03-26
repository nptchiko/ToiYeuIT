package com.example.toiyeuit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

// basic spring security config
@Configuration
public class SecurityConfig {

    private final RsaKeyProperties jwtConfigProperties;

    public SecurityConfig(RsaKeyProperties jwtConfigProperties){
        this.jwtConfigProperties = jwtConfigProperties;
    }


    private static final String[] PUBLIC_ENDPOINT = {
            "/api/auth/token",
            "/api/auth/refresh",
            "/api/auth/logout",
            "/api/course/**",
            "/api/course/{id}",
            "/api/users/**",
            "/api/payment/**"
    };

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers("api/admin/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session
                        -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))



        .build();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        yy
    }
}
