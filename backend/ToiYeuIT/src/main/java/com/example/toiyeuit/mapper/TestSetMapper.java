package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.entity.test.TestCollection;
import com.example.toiyeuit.repository.TestSubmissionRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public interface TestSetMapper {

    @Mapping(target = "skill", expression = "java(tests.getSkill().getName())")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "tests", source = "tests")
    TestSetResponse toTestSet(TestCollection tests);


    TestResponse toTestResponse(Test test);

}
