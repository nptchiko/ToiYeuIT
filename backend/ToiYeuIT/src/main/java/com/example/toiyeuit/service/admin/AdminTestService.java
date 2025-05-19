package com.example.toiyeuit.service.admin;


import com.example.toiyeuit.dto.admin.AdminTestResponse;
import com.example.toiyeuit.dto.admin.test.TestCreationRequest;
import com.example.toiyeuit.dto.admin.test.TestSetCreationRequest;
import com.example.toiyeuit.dto.admin.UpdateTestRequest;
import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.entity.question.Question;
import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.entity.test.TestCollection;
import com.example.toiyeuit.entity.test.TestDetail;
import com.example.toiyeuit.enums.QuestionScope;
import com.example.toiyeuit.enums.QuestionType;
import com.example.toiyeuit.mapper.QuestionMapper;
import com.example.toiyeuit.mapper.TestSetMapper;
import com.example.toiyeuit.repository.QuestionRepository;
import com.example.toiyeuit.repository.test.TestCollectionRepository;
import com.example.toiyeuit.repository.TestDetailRepository;
import com.example.toiyeuit.repository.TestRepository;
import com.example.toiyeuit.service.SkillService;
import com.example.toiyeuit.service.test.TestCollectionService;
import com.example.toiyeuit.service.test.TestService;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminTestService {

    TestDetailRepository testDetailRepository;
    TestService testService;

    TestRepository testRepository;

    TestCollectionService testCollectionService;
    TestCollectionRepository testCollectionRepository;

    SkillService skillService;

    QuestionRepository questionRepository;

    QuestionMapper questionMapper;
    TestSetMapper testSetMapper;

    public TestSetResponse saveTestSet(TestSetCreationRequest request){
        return testSetMapper.toTestSet(
                testCollectionRepository.save(
                        TestCollection.builder()
                                .description(request.getDescription())
                                .skill(skillService.findBySkillName(request.getName()))
                                .tests(null)
                                .title(request.getName())
                                .build()
                )
        );
    }

    @Transactional
    public TestResponse saveTest(TestCreationRequest request){
       log.info("[AdminTestService] DEBUGGING");
       log.info(String.format("Is questions present: %s",  request.getContent() != null ? "yes" : "no"));

       var test = testRepository.save(
                Test.builder()
                        .enabled(true)
                        .index(testService.numberOfTestInSet(request.getTestSetId())+1)
                        .title(request.getTitle())
                        .testCollection(testCollectionService.getById((int) request.getTestSetId()))
                        .build()
        );
       var content = request.getContent();

       int[] indexEachPart = {0, 1, 7, 32, 71, 101, 131, 147};

       for (var cont : content) {
           int part = cont.getPart();
           List<TestDetail> details = new LinkedList<>();
           List<Question> questions = new LinkedList<>();
           var inputQuestions = cont.getQuestions();

           int cnt = 0;

           for (var input : inputQuestions) {
               var question = questionMapper.toQuestion(input, QuestionType.MULTICHOICE, QuestionScope.TEST);
               var options = question.getOptions();

               for(var option : options){
                   option.setQuestion(question);
               }

               questions.add(question);

               details.add(TestDetail.builder()
                       .part(part)
                       .question(question)
                       .test(test)
                       .index(indexEachPart[part] + cnt++)
                       .build());

           }
           questionRepository.saveAll(questions);
           testDetailRepository.saveAll(details);
       }

       log.info(String.format("Is content existed: %s", content != null ? "yes" : "no"));
       log.info("[AdminTestService] END DEBUGGING");
       return testSetMapper.toTestResponse(test);
    }

    public Page<AdminTestResponse> getAllTests(Pageable pageable){
        return testRepository.findAll(pageable)
                .map(test -> {
                    TestCollection testCollection = test.getTestCollection();
                    return AdminTestResponse.builder()
                            .testSet(testCollection.getTitle())
                            .duration(testCollection.getSkill().getId() == 1 ? 45 : 75)
                            .testSetId(testCollection.getId())
                            .questions(testDetailRepository.countNumberOfQuesOfTest(test.getId()))
                            .testId(test.getId())
                            .name(test.getTitle())
                            .status(test.isEnabled() ? "Active" : "Not active")
                            .build();
                });
    }
    @Transactional
    public void updateTest(UpdateTestRequest request){
        var test = testService.getByID((long) request.getTestId());

        boolean status = true;
        if( request.getStatus() != null &&
            "Active".equalsIgnoreCase(request.getStatus()) ||
            "Not active".equalsIgnoreCase(request.getStatus())
        ){
            status = !"Not active".equalsIgnoreCase(request.getStatus());
        }

        String title = request.getName() !=  null ? request.getName() : test.getTitle();

        testRepository.update(status, title, test.getId());
    }

    @Transactional
    public void deleteTest(long id){
        testRepository.deleteById(id);
    }

    @Transactional
    public void deleteTestSet(long id){
        testCollectionRepository.deleteTestCollectionById(id);
    }
}
