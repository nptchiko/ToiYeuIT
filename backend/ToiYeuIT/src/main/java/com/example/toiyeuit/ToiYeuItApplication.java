package com.example.toiyeuit;

import com.example.toiyeuit.config.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties.class)
@EnableScheduling
public class ToiYeuItApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToiYeuItApplication.class, args);
    }

}
