package com.example.toiyeuit.config;

import com.example.toiyeuit.filter.JwtTokenFilter;
import com.example.toiyeuit.service.security.CustomUseDetailService;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.ExceptionTranslationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// basic spring security config
@Configuration
public class SecurityConfig {

    private final RsaKeyProperties jwtConfigProperties;

    @Autowired
    private  CustomUseDetailService useDetailService;

    private final JwtTokenFilter tokenFilter;

    public SecurityConfig(RsaKeyProperties jwtConfigProperties, JwtTokenFilter tokenFilter){
        this.jwtConfigProperties = jwtConfigProperties;
        this.tokenFilter = tokenFilter;
    }


    private static final String[] PUBLIC_ENDPOINT = {
            "/api/auth/login",
            "/api/auth/signup",
            "/api/auth/refresh",
            "/api/auth/logout",
//            "/api/courses/**",
            "/api/users/create-user",
            "/api/payment/**",
            "/api/lessons/**",
            "/api/flashcards/**",
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
                .exceptionHandling(ex -> {
                    ex.authenticationEntryPoint(new JwtAuthenticationEntryPoint());
                    //ex.accessDeniedHandler(new BearerTokenAccessDeniedHandler());
                    //  CustomAuthenticationEntryPoint
                    //  CustomAccessHandler
                })
                .addFilterAfter(tokenFilter, BearerTokenAuthenticationFilter.class)
        .build();
    }

}
