package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.UserDto;
import com.example.demo.entity.UserBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface UserMapper extends GenericMapper<UserDto, UserBean> {

}
