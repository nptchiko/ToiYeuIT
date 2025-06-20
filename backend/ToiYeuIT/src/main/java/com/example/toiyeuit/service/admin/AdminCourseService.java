package com.example.toiyeuit.service.admin;

import com.example.toiyeuit.dto.admin.CrudCourseRequest;
import com.example.toiyeuit.dto.response.PaginationResponse;
import com.example.toiyeuit.dto.response.admin.AdminEnrollmentResponse;
import com.example.toiyeuit.dto.response.admin.AdminOrderCourseResponse;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.mapper.CourseMapper;
import com.example.toiyeuit.mapper.CourseOrderMapper;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.repository.EnrollmentRepository;
import com.example.toiyeuit.repository.OrderCourseRepository;
import com.example.toiyeuit.service.CourseService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.Temporal;
import java.util.LinkedList;
import java.util.List;

@Service
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Slf4j
public class AdminCourseService {

    CourseRepository courseRepository;
    private final CourseService courseService;
    private final CourseMapper courseMapper;
    private final OrderCourseRepository orderCourseRepository;
    private final CourseOrderMapper courseOrderMapper;
    private final EnrollmentRepository enrollmentRepository;

    public long getRevenue(){
        return courseRepository.retrieveEachMonthRevenue(LocalDate.now());
    }

    public Course saveCourse(CrudCourseRequest request){
        return courseService.addCourse(courseMapper.toCourse(request));
    }

    public List<AdminEnrollmentResponse> getEnrollment(){
        return enrollmentRepository.findAll()
                .stream()
                .map(e -> {
                    return AdminEnrollmentResponse.builder()
                            .courseId(e.getCourse().getId())
                            .courseTitle(e.getCourse().getTitle())
                            .email(e.getUser().getEmail())
                            .price(e.getCourse().getPrice())
                            .username(e.getUser().getUsername())
                            .build();
                }).toList();

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

    public AdminOrderCourseResponse getOrderHistory(Pageable pageable){
        var pageOfOrder = orderCourseRepository.findAll(pageable);

        var pagination = PaginationResponse.builder()
                .totalPages(pageOfOrder.getTotalPages())
                .totalItems((int) pageOfOrder.getTotalElements())
                .build();

        return AdminOrderCourseResponse.builder()
                .orders(
                        pageOfOrder.getContent().stream()
                                .map(courseOrderMapper::toResponse)
                                .toList()
                )
                .pagination(pagination)
                .build();
    }

    public List<Long> getChartRevenue(){
        var result = new LinkedList<Long>();
        for (int i = 1; i <= 12; i++) {
            var ym = YearMonth.of(2024, i);
            result.add(courseRepository.retrieveEachMonthRevenue(
                    ym.atDay(1)));
        }
        return result;
    }

}
