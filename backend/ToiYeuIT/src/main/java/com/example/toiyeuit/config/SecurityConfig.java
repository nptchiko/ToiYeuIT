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
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
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
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.header.writers.CrossOriginOpenerPolicyHeaderWriter;
import org.springframework.security.web.server.header.CrossOriginOpenerPolicyServerHttpHeadersWriter;

// basic spring security config
@Configuration
public class SecurityConfig {

    private final RsaKeyProperties jwtConfigProperties;

    @Autowired
    private  CustomUseDetailService useDetailService;

    private final JwtTokenFilter tokenFilter;

    private final CorsConfiguration corsConfiguration;

    private final OAuth2SuccessHandler handler;

    public SecurityConfig(RsaKeyProperties jwtConfigProperties, JwtTokenFilter tokenFilter, CorsConfiguration corsConfiguration, OAuth2SuccessHandler handler){
        this.jwtConfigProperties = jwtConfigProperties;
        this.tokenFilter = tokenFilter;
        this.corsConfiguration = corsConfiguration;
        this.handler = handler;
    }


    public static final String[] PUBLIC_ENDPOINT = {
            "/login/**", "/oauth2/**",
        "/api/auth/**",
        "/api/users/create-user",
        "/api/courses/**",
        "/api/deck/**",
        "/api/verify/confirm",
        "/swagger-ui/**",
        "/v3/api-docs/**"
    };


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(c -> c.configurationSource(corsConfiguration.corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(PUBLIC_ENDPOINT).permitAll()
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                )
                // allow popup in frontend
                .headers(headers -> headers
                        .crossOriginOpenerPolicy(cop -> cop
                                .policy(CrossOriginOpenerPolicyHeaderWriter.CrossOriginOpenerPolicy.SAME_ORIGIN)
                        )
                )
                .sessionManagement(session
                        -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> {
                    ex.authenticationEntryPoint(new JwtAuthenticationEntryPoint());
                    //ex.accessDeniedHandler(new BearerTokenAccessDeniedHandler());
                    //  CustomAuthenticationEntryPoint
                    //  CustomAccessHandler
                })
                .oauth2Login(auth -> {
                    auth.successHandler(handler);
                })
                .addFilterAfter(tokenFilter, BasicAuthenticationFilter.class)
        .build();
    }

}
