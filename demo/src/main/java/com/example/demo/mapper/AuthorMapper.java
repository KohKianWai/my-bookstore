package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.AuthorDto;
import com.example.demo.entity.AuthorBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface AuthorMapper extends GenericMapper<AuthorDto, AuthorBean> {

}
