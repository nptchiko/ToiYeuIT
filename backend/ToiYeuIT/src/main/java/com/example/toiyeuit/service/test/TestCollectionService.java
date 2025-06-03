package com.example.toiyeuit.service.test;


import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.entity.test.TestCollection;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.mapper.TestSetMapper;
import com.example.toiyeuit.repository.SkillRepository;
import com.example.toiyeuit.repository.test.TestCollectionRepository;
import com.example.toiyeuit.repository.TestSubmissionRepository;
import com.example.toiyeuit.service.UserService;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestCollectionService {

    TestCollectionRepository testsRepositoty;
    SkillRepository skillRepository;
    TestSubmissionRepository testSubmissionRepository;
    UserService userService;

    @Qualifier("testSetMapper")
    TestSetMapper testsMapper;

    public List<TestSetResponse> getAll(){
        var tests = testsRepositoty.findAll();
        var user = userService.getUserByEmail(SecurityUtils.getCurrentUserLogin());
        //var user = userService.getUserByEmail("mikudeptrai@gmail.com");
        var result = tests.stream().map(
            testsMapper::toTestSet
        ).toList();
        addSubmitStatus(result, user.getId());
        return result;
    }

    public List<TestSetResponse> getTestSetBasedOnSkill(String skill){
        String skillName = skill.toUpperCase();

        var user = userService.getUserByEmail(SecurityUtils.getCurrentUserLogin());

        var _skill = skillRepository.findByName(skillName).orElseThrow(
                () -> new AppException(ErrorCode.SKILL_NOT_FOUND));

        var result = testsRepositoty.findAllBySkillId(_skill.getId()).stream().map(testsMapper::toTestSet).toList();
        addSubmitStatus(result, user.getId());

        return result;
    }
    public TestCollection getById(Integer id){
        return testsRepositoty.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.TEST_NOT_FOUND));

    }
        private void addSubmitStatus(List<TestSetResponse> tests, long userId){
            for (var col : tests){
                for (var t : col.getTests()){
                    t.setSubmitted(testSubmissionRepository.existsByTest_IdAndUser_Id((int) t.getId(), userId));
                }
            }
        }
}
