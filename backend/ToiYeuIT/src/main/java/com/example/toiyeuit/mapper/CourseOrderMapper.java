package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.OrderCourseResponse;
import com.example.toiyeuit.entity.course.CourseOrder;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CourseOrderMapper {

    CourseOrderMapper INSTANCE = Mappers.getMapper(CourseOrderMapper.class);

    @Mapping(source = "course.title", target = "courseTitle")
    @Mapping(source = "user.username", target = "username")
    @Mapping(source = "paymentStatus", target = "status")
    @Mapping(source = "paymentMethod", target = "paymentMethod")
    @Mapping(source = "createdAt", target = "createdAt")
 // @Mapping(source = "course.imageUrl", target = "courseThumbnailUrl")
    OrderCourseResponse toResponse(CourseOrder courseOrder);
}

