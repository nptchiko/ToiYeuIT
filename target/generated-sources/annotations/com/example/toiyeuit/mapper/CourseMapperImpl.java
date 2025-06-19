package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.admin.CrudCourseRequest;
import com.example.toiyeuit.entity.course.Course;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-19T18:59:17+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class CourseMapperImpl implements CourseMapper {

    @Override
    public Course toCourse(CrudCourseRequest request) {
        if ( request == null ) {
            return null;
        }

        Course.CourseBuilder course = Course.builder();

        course.level( convertLevel( request.getLevel() ) );
        course.title( request.getTitle() );
        course.description( request.getDescription() );
        course.price( request.getPrice() );
        course.enabled( request.isEnabled() );
        course.duration( request.getDuration() );
        course.tag( request.getTag() );
        course.type( request.getType() );

        return course.build();
    }
}
