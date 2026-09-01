package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.CategoryDto;
import com.example.demo.entity.CategoryBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface CategoryMapper extends GenericMapper<CategoryDto, CategoryBean> {

}
