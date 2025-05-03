package com.example.toiyeuit.service.payment;

import com.example.toiyeuit.config.VNPAYConfig;
import com.example.toiyeuit.dto.request.OrderCourseRequest;
import com.example.toiyeuit.dto.response.OrderCourseResponse;
import com.example.toiyeuit.dto.response.VNPayResponse;
import com.example.toiyeuit.entity.User;
import com.example.toiyeuit.entity.course.Course;
import com.example.toiyeuit.entity.course.CourseOrder;
import com.example.toiyeuit.entity.course.Enrollment;
import com.example.toiyeuit.entity.key.OrderKey;
import com.example.toiyeuit.enums.CourseStatus;
import com.example.toiyeuit.enums.PaymentMethod;
import com.example.toiyeuit.enums.PaymentStatus;
import com.example.toiyeuit.enums.PredefinedRole;
import com.example.toiyeuit.exception.ResourceNotFoundException;
import com.example.toiyeuit.repository.CourseRepository;
import com.example.toiyeuit.repository.EnrollmentRepository;
import com.example.toiyeuit.repository.OrderCourseRepository;
import com.example.toiyeuit.repository.UserRepository;
import com.example.toiyeuit.service.UserService;
import com.example.toiyeuit.utils.SecurityUtils;
import com.example.toiyeuit.utils.VNPayUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final VNPAYConfig vnPayConfig;
    private final OrderCourseRepository orderCourseRepository;
    private final CourseRepository courseRepository;
    private final UserService userService;
    private final EnrollmentRepository enrollmentRepository;

    public VNPayResponse createVnPayPayment(HttpServletRequest request) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VNPayUtil.getIpAddress(request));
        //build query url
        String queryUrl = VNPayUtil.getPaymentURL(vnpParamsMap, true);
        String hashData = VNPayUtil.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VNPayUtil.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        String paymentUrl = vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;
        return VNPayResponse.builder()
                .paymentUrl(paymentUrl).build();
    }

    @Transactional
    public OrderCourseResponse saveOrder(OrderCourseRequest orderCourseRequest) throws ResourceNotFoundException {

        Course course = courseRepository.findById(orderCourseRequest.getCourseId()).orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        var user = userService.getUserByEmail(
                SecurityUtils.getCurrentUserLogin()
        );

       var result = orderCourseRepository.save(CourseOrder.builder()
                       .id(OrderKey.builder().user_id(user.getId()).course_id(course.getId()).build())
               .course(course)
               .user(user)
               .paymentMethod(PaymentMethod.VNPAY)
               .paymentStatus(PaymentStatus.fromString(orderCourseRequest.getPaymentMethod()))
               .build());

       if (result.getPaymentStatus() == PaymentStatus.PAID){
           enrollmentRepository.save(
                   Enrollment.builder()
                           .course(course)
                           .status(CourseStatus.PENDING)
                           .user(user)
                           .build());

           userService.updateRole(user, PredefinedRole.STUDENT);
       }

       return OrderCourseResponse.builder()
               .courseId(orderCourseRequest.getCourseId())
               .userId(user.getId())
               .paymentMethod(orderCourseRequest.getPaymentMethod())
               .status(orderCourseRequest.getStatus())
               .build();
    }
}
