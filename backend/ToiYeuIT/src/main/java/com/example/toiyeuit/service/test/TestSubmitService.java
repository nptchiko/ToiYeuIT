package com.example.toiyeuit.service.test;


import com.example.toiyeuit.dto.request.testSubmit.TestSubmitRequest;
import com.example.toiyeuit.entity.test.TestResult;
import com.example.toiyeuit.entity.test.TestSubmission;
import com.example.toiyeuit.repository.QuestionRepository;
import com.example.toiyeuit.repository.TestResultRepository;
import com.example.toiyeuit.repository.TestSubmissionRepository;
import com.example.toiyeuit.service.QuestionService;
import com.example.toiyeuit.service.UserService;
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

    //    var email = SecurityUtils.getCurrentUserLogin().orElseThrow(
    //            () -> new AppException(ErrorCode.UNAUTHENTICATED)
    //    );
        // temp
        var user = userService.getUserByEmail("mikudeptrai@gmail.com");

        var submit = testSubmissionRepository.findByWhoMadeIt(test.getId(), user.getId());
        if  (submit.isPresent())
            testResultRepository.deleteTestResultsByTestSubmission_Id(submit.get().getId());
        else {
            submit = java.util.Optional.of(testSubmissionRepository.save(
                    TestSubmission.builder()
                            .score(request.getScore())
                            .test(test)
                            .user(user)
                            .build()));
        }
        var result = submit.get();
        for( var p : request.getContext()) {
            for (var a : p.getAnswers()) {
                var question = questionService.getById(a.getId());
                testResultRepository.save(
                        TestResult.builder()
                                .answer(a.getAnswer())
                                .testSubmission(result)
                                .question(question)
                                .part(p.getPart())
                                .build()
                );
            }
        }
    }

}
