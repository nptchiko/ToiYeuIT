package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.admin.CrudCourseRequest;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.enums.CourseLevel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CourseMapper {

    @Mapping(target = "level", source = "level", qualifiedByName = "convertLevel")
    Course toCourse(CrudCourseRequest request);

    @Named("convertLevel")
    default CourseLevel convertLevel(String _level){
        for (CourseLevel level : CourseLevel.values())
            if (level.getName().compareTo(_level) == 0)
                    return level;
        return CourseLevel.BASIC;
    }

}
