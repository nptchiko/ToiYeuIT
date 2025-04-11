package com.example.toiyeuit.config;


import com.example.toiyeuit.entity.Role;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.enums.Gender;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.repository.RoleRepository;
import com.example.toiyeuit.repository.UserRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Configuration
public class InitApplication implements ApplicationRunner{

    @Value("${credential.admin-email}")
    private String ADMIN_EMAIL;

    @Value("${credential.admin-password}")
    private  String ADMIN_PASSWORD;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @ConditionalOnProperty(
            prefix = "spring",
            value = "datasource.driverClassName",
            havingValue = "com.mysql.cj.jdbc.Driver"
    )
    @Transactional
    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("Initializing application......");
            Optional<Role> userRole = roleRepository.findByName("USER");
            if (userRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .name("USER")
                        .build()
                );
            }

            Optional<Role> adminRole = roleRepository.findByName("ADMIN");
            if (adminRole.isEmpty()) {
                roleRepository.save(Role.builder()
                        .name("ADMIN")
                        .build()
                );
            }

            if (userRepository.findByEmail(ADMIN_EMAIL).isEmpty()) {
                Role role = roleRepository.findByName("ADMIN")
                        .orElseThrow(() -> new RuntimeException("Role not found"));

                log.info("admin: " + ADMIN_EMAIL);

                log.info("admin: " + ADMIN_PASSWORD);
                User user = User.builder()
                        .email(ADMIN_EMAIL)
                        .username("mikubingu")
                        .password(passwordEncoder.encode(ADMIN_PASSWORD))
                        .phone("0123456789")
                        .role(role)
                        .gender(Gender.m)
                        .build();
                userRepository.save(user);
                log.warn("Admin user has been created with password of 12345");
            }
            log.info("Initialization completed");
    }
}
