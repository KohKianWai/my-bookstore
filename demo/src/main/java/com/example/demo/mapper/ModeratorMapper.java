package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.ModeratorDto;
import com.example.demo.entity.ModeratorBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface ModeratorMapper extends GenericMapper<ModeratorDto, ModeratorBean> {

}
