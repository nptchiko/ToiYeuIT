package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.entity.TestCollection;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TestSetMapper {

    @Mapping(target = "skill", expression = "java(tests.getSkill().getName())")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "tests", source = "tests")
    TestSetResponse toTestSet(TestCollection tests);
}
