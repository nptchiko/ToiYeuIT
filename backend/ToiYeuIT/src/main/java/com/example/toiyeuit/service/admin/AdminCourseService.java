package com.example.toiyeuit.service.admin;

import com.example.toiyeuit.repository.CourseRepository;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminCourseService {

    CourseRepository courseRepository;

    public long getRevenue(){
        return courseRepository.retrieveMonthlyRevenue();
    }
}
