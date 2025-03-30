package com.example.toiyeuit.scheduling;


import com.example.toiyeuit.repository.InvalidTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenCleaningScheduler {

    final InvalidTokenRepository invalidatedTokenRepository;

    @Scheduled(fixedRate = 1, timeUnit = TimeUnit.DAYS)
    public void cleanupExpiredTokens(){
        log.info("Start Scheduler To Delete Expired Token");
        invalidatedTokenRepository.deleteInvalidTokenSince();
    }
}
