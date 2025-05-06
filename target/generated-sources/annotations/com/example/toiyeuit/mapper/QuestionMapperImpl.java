package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.QuestionResponse;
import com.example.toiyeuit.entity.question.Question;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-04T22:44:52+0700",
    comments = "version: 1.6.2, compiler: javac, environment: Java 21.0.6 (Oracle Corporation)"
)
@Component
public class QuestionMapperImpl implements QuestionMapper {

    @Override
    public QuestionResponse toQuestionResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionResponse.QuestionResponseBuilder questionResponse = QuestionResponse.builder();

        questionResponse.text( question.getDescription() );
        questionResponse.options( convert( question.getOptions() ) );
        if ( question.getId() != null ) {
            questionResponse.id( question.getId().intValue() );
        }
        questionResponse.audioSource( question.getAudioSource() );
        questionResponse.imageSource( question.getImageSource() );
        questionResponse.correctAnswer( question.getCorrectAnswer() );

        return questionResponse.build();
    }
}
