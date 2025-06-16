package com.example.toiyeuit.service;

import com.example.toiyeuit.entity.Skill;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.SkillRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SkillService {
    SkillRepository skillRepository;

    public Skill findBySkillName(String name){
        log.info("Skill parameter: {}", name);
        return skillRepository.findByName(
                name.toUpperCase()
        ).orElseThrow(() -> new AppException(ErrorCode.SKILL_NOT_FOUND));
    }
}
