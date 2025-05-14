package com.example.toiyeuit.service.admin;

import com.example.toiyeuit.dto.admin.UpdateCourseRequest;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.mapper.CourseMapper;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.service.CourseService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminCourseService {

    CourseRepository courseRepository;
    private final CourseService courseService;
    private final CourseMapper courseMapper;

    public long getRevenue(){
        return courseRepository.retrieveMonthlyRevenue();
    }

    public Page<Course> getAll(Pageable pageable){
        return courseRepository.findAll(pageable);
    }
    public Course updateCourse(int id, UpdateCourseRequest request){
        var course = courseService.findById(id);
        course = courseMapper.toCourse(request);
        return courseRepository.save(course);
    }

    @Transactional
    public void toggleVisiable(int id, boolean isEnabled){
        courseRepository.toggleVisiable(id, isEnabled ? 1 : 0);
    }
}
