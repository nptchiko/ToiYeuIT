package com.example.toiyeuit.service.test;

import com.example.toiyeuit.dto.response.AnswerResponse;
import com.example.toiyeuit.dto.response.TestDetailsResponse;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.repository.TestResultRepository;
import com.example.toiyeuit.repository.TestSubmissionRepository;
import com.example.toiyeuit.service.UserService;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class TestResultService {
    UserService userService;
    TestSubmissionRepository submitRepository;
    TestService testService;
    TestResultRepository testResultRepository;

    private Long getSubmissionId(long testId) {
       /* var user = userService.getUserByEmail(
                SecurityUtils.getCurrentUserLogin()
        );*/
        var user = userService.getUserByEmail("mikudeptrai@gmail.com");
        return submitRepository.findByWhoMadeIt(testId, user.getId())
                .orElseThrow(() -> new AppException(ErrorCode.TEST_NOT_DONE))
                .getId();
    }

    public TestDetailsResponse retrieveTestResult(long testId) {
        long submitId = getSubmissionId(testId);
        var test = testService.getByID(testId);
        int skillId = test.getTestCollection().getSkill().getId();
        return TestDetailsResponse.builder()
                .testId(testId)
                .title(test.getTitle())
                .context(retrieveLRResult(testId, submitId, skillId == 2))
                .build();
    }

    private List<Map<String, Object>> retrieveLRResult(long testId, long submitId, boolean isReading) {
        List<AnswerResponse> result = null;
        List<Map<String, Object>> context = new LinkedList<>();

        int start = isReading ? 5 : 1, end = isReading ? 7 : 4;

        for (int i = start; i <= end; i++) {
            Map<String, Object> body = new HashMap<>();
            result =
                    testResultRepository.getBySubmitIdAndPart(submitId, i)
                            .stream().map(e -> AnswerResponse.builder()
                                    .answer(e.getAnswer())
                                    .id(e.getQuestion().getId().intValue())
                                    .build()).toList();
            body.put("part", i);
            body.put("answers", result);
            context.add(body);
        }
        return context;
    }
}
