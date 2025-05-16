package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.OrderCourseResponse;
import com.example.toiyeuit.entity.course.CourseOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CourseOrderMapper {

    CourseOrderMapper INSTANCE = Mappers.getMapper(CourseOrderMapper.class);

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "paymentStatus", target = "status")
    @Mapping(source = "paymentMethod", target = "paymentMethod")
    @Mapping(source = "createdAt", target = "createdAt")
    OrderCourseResponse toResponse(CourseOrder courseOrder);
}

