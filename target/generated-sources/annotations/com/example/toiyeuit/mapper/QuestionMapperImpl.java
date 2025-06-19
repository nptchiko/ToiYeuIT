package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.request.QuestionRequest;
import com.example.toiyeuit.dto.response.QuestionResponse;
import com.example.toiyeuit.entity.question.MultichoiceDetail;
import com.example.toiyeuit.entity.question.Question;
import com.example.toiyeuit.enums.QuestionScope;
import com.example.toiyeuit.enums.QuestionType;
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

    @Override
    public Question toQuestion(QuestionRequest request, QuestionType type, QuestionScope scope) {
        if ( request == null && type == null && scope == null ) {
            return null;
        }

        Question.QuestionBuilder question = Question.builder();

        if ( request != null ) {
            Set<MultichoiceDetail> set = request.getOptions();
            if ( set != null ) {
                question.options( new LinkedHashSet<MultichoiceDetail>( set ) );
            }
            question.description( request.getDescription() );
            question.correctAnswer( request.getCorrectAnswer() );
            question.imageSource( request.getImageSource() );
            question.audioSource( request.getAudioSource() );
        }
        question.questionType( type );
        question.questionScope( scope );

        return question.build();
    }
}
