package com.example.toiyeuit.config;

import com.example.toiyeuit.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfiguration {

    @Value("${env.frontend_port}")
    private static String FRONTEND_PORT;

    @Bean
    public CorsConfigurationSource corsConfigurationSource(CourseRepository courseRepository) {
        org.springframework.web.cors.CorsConfiguration corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost: " + FRONTEND_PORT));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept", "x-no-retry", "Access-Control-Allow-Origin"));
        corsConfiguration.setExposedHeaders(List.of("Authorization", "Content-Type"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;

    }
}
