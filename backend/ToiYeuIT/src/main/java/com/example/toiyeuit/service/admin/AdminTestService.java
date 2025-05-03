package com.example.toiyeuit.service.admin;


import com.example.toiyeuit.dto.admin.AdminTestResponse;
import com.example.toiyeuit.dto.admin.TestCreationRequest;
import com.example.toiyeuit.dto.admin.TestSetCreationRequest;
import com.example.toiyeuit.dto.admin.UpdateTestRequest;
import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.entity.test.TestCollection;
import com.example.toiyeuit.mapper.TestSetMapper;
import com.example.toiyeuit.repository.SkillRepository;
import com.example.toiyeuit.repository.TestCollectionRepository;
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

@Service
@Slf4j
@AllArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class AdminTestService {
    TestRepository testRepository;
    TestDetailRepository testDetailRepository;
    TestService testService;
    TestCollectionService testCollectionService;
    TestSetMapper testSetMapper;
    TestCollectionRepository testCollectionRepository;
    SkillService skillService;

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
    public TestResponse saveTest(TestCreationRequest request){
       return testSetMapper.toTestResponse(testRepository.save(
                Test.builder()
                        .enabled(true)
                        .index(testService.numberOfTestInSet(request.getTestSetId()))
                        .title(request.getTitle())
                        .testCollection(testCollectionService.getById((int) request.getTestSetId()))
                        .build()
        ));
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
