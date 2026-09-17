package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.ShelfDto;
import com.example.demo.entity.ShelfBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface ShelfMapper extends GenericMapper<ShelfDto, ShelfBean> {

}
