package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.TestResponse;
import com.example.toiyeuit.dto.response.TestSetResponse;
import com.example.toiyeuit.entity.test.Test;
import com.example.toiyeuit.entity.test.TestCollection;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-19T18:59:17+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class TestSetMapperImpl implements TestSetMapper {

    @Override
    public TestSetResponse toTestSet(TestCollection tests) {
        if ( tests == null ) {
            return null;
        }

        TestSetResponse.TestSetResponseBuilder testSetResponse = TestSetResponse.builder();

        testSetResponse.id( tests.getId() );
        testSetResponse.tests( testSetToTestResponseSet( tests.getTests() ) );
        testSetResponse.title( tests.getTitle() );
        testSetResponse.description( tests.getDescription() );

        testSetResponse.skill( tests.getSkill().getName() );

        return testSetResponse.build();
    }

    @Override
    public TestResponse toTestResponse(Test test) {
        if ( test == null ) {
            return null;
        }

        TestResponse.TestResponseBuilder testResponse = TestResponse.builder();

        if ( test.getId() != null ) {
            testResponse.id( test.getId() );
        }
        testResponse.title( test.getTitle() );
        testResponse.index( test.getIndex() );

        return testResponse.build();
    }

    protected Set<TestResponse> testSetToTestResponseSet(Set<Test> set) {
        if ( set == null ) {
            return null;
        }

        Set<TestResponse> set1 = LinkedHashSet.newLinkedHashSet( set.size() );
        for ( Test test : set ) {
            set1.add( toTestResponse( test ) );
        }

        return set1;
    }
}
