package com.example.toiyeuit.service;


import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.mapper.TestSetMapper;
import com.example.toiyeuit.mapper.TestSetMapperImpl;
import com.example.toiyeuit.repository.SkillRepository;
import com.example.toiyeuit.repository.TestCollectionRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestCollectionService {

    TestCollectionRepository testsRepositoty;
    SkillRepository skillRepository;

    @Qualifier("testSetMapper")
    TestSetMapper testsMapper;

    public List<TestSetResponse> getAll(){
        var tests = testsRepositoty.findAll();
        var result = tests.stream().map(testsMapper::toTestSet).toList();

        return result;
    }

    public List<TestSetResponse> getTestSetBasedOnSkill(String skill){
        String skillName = skill.toUpperCase();

        var _skill = skillRepository.findByName(skillName).orElseThrow(
                () -> new AppException(ErrorCode.SKILL_NOT_FOUND));

        return testsRepositoty.findAllBySkillId(_skill.getId()).stream().map(testsMapper::toTestSet).toList();
    }

}
