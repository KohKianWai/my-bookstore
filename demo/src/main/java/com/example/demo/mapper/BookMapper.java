package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.BookDto;
import com.example.demo.entity.BookBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface BookMapper extends GenericMapper<BookDto, BookBean>{

}
