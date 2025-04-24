package com.example.toiyeuit.service.admin;


import com.example.toiyeuit.dto.admin.AdminTestResponse;
import com.example.toiyeuit.dto.admin.AdminUpdateTestRequest;
import com.example.toiyeuit.entity.test.TestCollection;
import com.example.toiyeuit.repository.TestDetailRepository;
import com.example.toiyeuit.repository.TestRepository;
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
    private final TestService testService;

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
                            .status(test.isEnabled() ? "Active" : "Not active")
                            .build();
                });
    }
    @Transactional
    public void updateTest(AdminUpdateTestRequest request){
        var test = testService.getByID((long) request.getTestId());

        boolean status = true;
        if( request.getStatus() != null &&
            "Active".equalsIgnoreCase(request.getStatus()) ||
            "Not active".equalsIgnoreCase(request.getStatus())
        ){
            status = !"Not active".equalsIgnoreCase(request.getStatus());
        }

        String title = request.getTitle() !=  null ? request.getTitle() : test.getTitle();

        testRepository.update(status, title, test.getId());
    }

    @Transactional
    public void deleteTest(long id){
        testRepository.deleteById(id);
    }
}
