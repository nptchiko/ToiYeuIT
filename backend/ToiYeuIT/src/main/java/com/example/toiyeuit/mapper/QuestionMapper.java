package com.example.toiyeuit.mapper;

import com.example.toiyeuit.dto.response.QuestionResponse;
import com.example.toiyeuit.entity.question.MultichoiceDetail;
import com.example.toiyeuit.entity.question.Question;
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
            if (option.getDescription().matches("\\([ABCD]\\)")) {
                result.add(option.getDescription());
                continue;
            }
            result.add(String.format("(%s) %s",
                    option.getId().getKey().toString(),
                    option.getDescription()
            ));

        }

        return result;
    }
}
