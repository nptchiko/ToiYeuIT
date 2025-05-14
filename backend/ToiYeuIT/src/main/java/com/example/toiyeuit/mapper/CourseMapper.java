package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.admin.UpdateCourseRequest;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.enums.CourseLevel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mapping(target = "level", source = "level", qualifiedByName = "convertLevel")
    @Mapping(target = "type", source = "type")
    Course toCourse(UpdateCourseRequest request);

    @Named("convertLevel")
    default CourseLevel convertLevel(String _level){
        for (CourseLevel level : CourseLevel.values())
            if (level.getName().compareTo(_level) == 0)
                    return level;
        return CourseLevel.BASIC;
    }

}
