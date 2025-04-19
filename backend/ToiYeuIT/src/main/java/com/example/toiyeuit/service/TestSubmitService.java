package com.example.toiyeuit.service;


import com.example.toiyeuit.dto.request.testSubmit.TestSubmitRequest;
import com.example.toiyeuit.entity.test.TestDetail;
import com.example.toiyeuit.entity.test.TestResult;
import com.example.toiyeuit.entity.test.TestSubmission;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.QuestionRepository;
import com.example.toiyeuit.repository.TestResultRepository;
import com.example.toiyeuit.repository.TestSubmissionRepository;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestSubmitService {

    TestService testService;
    UserService userService;
    TestResultRepository resultRepository;

    private final TestSubmissionRepository testSubmissionRepository;
    private final TestResultRepository testResultRepository;
    private final QuestionService questionService;
    private final QuestionRepository questionRepository;


    @Transactional
    public void submitTest(TestSubmitRequest request){

        var test = testService.getByID(request.getTestId());

        var email = SecurityUtils.getCurrentUserLogin().orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );

        var user = userService.getUserByEmail(email);

        var body = TestSubmission.builder()
                .id(request.getSubmitId())
                .part(request.getPart())
                .score(request.getScore())
                .test(test)
                .user(user)
                .build();

        var result = testSubmissionRepository.save(body);

        for (var a : request.getAnswers()) {
            var question = questionService.getById(a.getId());
            testResultRepository.save(
                    TestResult.builder()
                            .answer(a.getAnswer())
                            .testSubmission(result)
                            .question(question)
                            .build()
            );
        }
    }

}
