package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.OrderCourseResponse;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.course.CourseOrder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-19T23:31:12+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class CourseOrderMapperImpl implements CourseOrderMapper {

    @Override
    public OrderCourseResponse toResponse(CourseOrder courseOrder) {
        if ( courseOrder == null ) {
            return null;
        }

        OrderCourseResponse.OrderCourseResponseBuilder orderCourseResponse = OrderCourseResponse.builder();

        orderCourseResponse.courseTitle( courseOrderCourseTitle( courseOrder ) );
        orderCourseResponse.username( courseOrderUserUsername( courseOrder ) );
        if ( courseOrder.getPaymentStatus() != null ) {
            orderCourseResponse.status( courseOrder.getPaymentStatus().name() );
        }
        if ( courseOrder.getPaymentMethod() != null ) {
            orderCourseResponse.paymentMethod( courseOrder.getPaymentMethod().name() );
        }
        orderCourseResponse.createdAt( courseOrder.getCreatedAt() );

        orderCourseResponse.courseThumbnailUrl( new String("fake link") );

        return orderCourseResponse.build();
    }

    private String courseOrderCourseTitle(CourseOrder courseOrder) {
        Course course = courseOrder.getCourse();
        if ( course == null ) {
            return null;
        }
        return course.getTitle();
    }

    private String courseOrderUserUsername(CourseOrder courseOrder) {
        User user = courseOrder.getUser();
        if ( user == null ) {
            return null;
        }
        return user.getUsername();
    }
}
