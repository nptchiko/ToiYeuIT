package com.example.toiyeuit.service.test;

import com.example.toiyeuit.dto.response.QuestionResponse;
import com.example.toiyeuit.dto.response.TestDetailsResponse;
import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import com.example.toiyeuit.mapper.QuestionMapper;
import com.example.toiyeuit.repository.QuestionClusterRepository;
import com.example.toiyeuit.repository.QuestionRepository;
import com.example.toiyeuit.repository.TestRepository;
import com.example.toiyeuit.service.UserService;
import com.example.toiyeuit.utils.SecurityUtils;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TestService {

    TestRepository testRepository;
    QuestionClusterRepository questionClusterRepository;
    QuestionRepository questionRepository;
    QuestionMapper questionMapper;
    private final UserService userService;

    public int numberOfTestInSet(long testSetId){
        return (int)testRepository.countAllByTestCollection_Id((int)testSetId);
    }

    public Test getByID(Long id){
        return testRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.TEST_NOT_FOUND)
        );
    }
    public TestDetailsResponse getTestByID(Long id){

        var test = getByID(id);

        var skillId = test.getTestCollection().getSkill().getId();

        return TestDetailsResponse.builder()
                .testId(id)
                .title(test.getTitle())
                .context(skillId == 1 ? retrieveListening(id) : retrieveReading(id))
                .build();
    }
    private List<Map<String, Object>> retrieveReading(long testId){
        List<QuestionResponse> result = null;
        List<Map<String, Object>> context = new LinkedList<>();
        Map<String, Object> body = new HashMap<>();
        result = questionRepository
                .findAllByTestIDAndPart(testId, 5)
                .stream().map(questionMapper::toQuestionResponse)
                .toList();
        body.put("part", 5);
        body.put("questions", result);
        context.add(new HashMap<>(body));

        for (int i = 6; i <= 7; i++) {
            body = new LinkedHashMap<>();
            body.put("part", i);
            var cluster = questionClusterRepository.findAllByTestIdAndPart(testId, i);
            var list = new LinkedList<>();
            for (var c : cluster) {
                var id = c.getIndexes();
                var res = questionRepository.findAllByQuestionCluster(testId, i, id)
                        .stream().map(questionMapper::toQuestionResponse)
                        .toList();
                var detail = new HashMap<>();

                detail.put("paragraph", c.getParagraph());
                detail.put("questions", res);

                list.add(detail);
            }
            body.put("questions", list);
            context.add(body);
        }
        return context;
    }
    private List<Map<String, Object>> retrieveListening(long testId){
        List<QuestionResponse> result = null;
        List<Map<String, Object>> context = new LinkedList<>();
        for (int start = 1; start <= 4; start++){
            log.info("Part: " + start);
            Map<String, Object> body = new HashMap<>();
            result = questionRepository
                    .findAllByTestIDAndPart(testId, start)
                    .stream().map(questionMapper::toQuestionResponse)
                    .toList();
            body.put("part", start);
            body.put("questions", result);
            context.add(body);
        }
        return context;
    }
    public List<TestResponse> retrieveInputTest(){
        var user = userService.getUserByEmail(
                SecurityUtils.getCurrentUserLogin()
        //        "mikudeptrai@gmail.com"
        );
        return testRepository.retrieveInputTest(user.getId());

    }


}
