package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.CashAccountTransactionDto;
import com.example.demo.entity.CashAccountTransactionBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface CashAccountTransactionMapper extends GenericMapper<CashAccountTransactionDto, CashAccountTransactionBean> {

}
