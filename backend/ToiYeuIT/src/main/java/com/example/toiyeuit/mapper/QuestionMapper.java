package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.request.QuestionRequest;
import com.example.toiyeuit.dto.response.QuestionResponse;
import com.example.toiyeuit.entity.question.MultichoiceDetail;
import com.example.toiyeuit.entity.question.Question;
import com.example.toiyeuit.enums.QuestionScope;
import com.example.toiyeuit.enums.QuestionType;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    @Mapping(target = "text", source = "description")
    @Mapping(target = "options", source = "options", qualifiedByName = "convertOptions" )
    QuestionResponse toQuestionResponse(Question question);

    @Named("convertOptions")
    default List<String> convert(Set<MultichoiceDetail> options){
        var result = new LinkedList<String>();

        for (var option : options){

                result.add(option.getDescription());
        }

        return result;
    }

    @Mapping(source = "type", target = "questionType")
    @Mapping(source = "scope", target = "questionScope")
    @Mapping(target = "options", source = "request.options")
    Question toQuestion(QuestionRequest request, QuestionType type, QuestionScope scope);
}
