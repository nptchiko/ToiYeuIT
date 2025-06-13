package com.example.toiyeuit;

import com.example.toiyeuit.config.RsaKeyProperties;
import com.example.toiyeuit.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
@EnableScheduling
@EnableFeignClients
public class ToiYeuItApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToiYeuItApplication.class, args);
    }

}
