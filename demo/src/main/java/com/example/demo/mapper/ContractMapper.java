package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.ContractDto;
import com.example.demo.entity.ContractBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface ContractMapper extends GenericMapper<ContractDto, ContractBean> {

}
