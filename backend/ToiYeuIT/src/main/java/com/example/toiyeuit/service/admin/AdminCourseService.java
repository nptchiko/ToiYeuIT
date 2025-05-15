package com.example.toiyeuit.service.admin;

import com.example.toiyeuit.dto.admin.CrudCourseRequest;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.mapper.CourseMapper;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.service.CourseService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Slf4j
public class AdminCourseService {

    CourseRepository courseRepository;
    private final CourseService courseService;
    private final CourseMapper courseMapper;

    public long getRevenue(){
        return courseRepository.retrieveMonthlyRevenue();
    }

    public Course saveCourse(CrudCourseRequest request){
        return courseService.addCourse(courseMapper.toCourse(request));
    }

    public Page<Course> getAll(Pageable pageable){
        return courseRepository.findAll(pageable);
    }
    public Course updateCourse(int id, CrudCourseRequest request){
        var course = courseService.findById(id);
        request.setType(course.getType());
        course = courseMapper.toCourse(request);
        course.setId(id);
        return courseRepository.save(course);
    }

    public void deleteCourse(int id){
        courseService.delete(id);
    }

    @Transactional
    public void toggleVisiable(int id, boolean isEnabled){
        courseRepository.toggleVisiable(id, isEnabled ? 1 : 0);
    }
}
