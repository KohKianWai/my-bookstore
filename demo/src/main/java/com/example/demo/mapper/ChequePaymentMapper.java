package com.example.demo.mapper;

import com.example.demo.config.MapperConfigBase;
import com.example.demo.dto.ChequePaymentDto;
import com.example.demo.entity.ChequePaymentBean;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfigBase.class)
public interface ChequePaymentMapper extends GenericMapper<ChequePaymentDto, ChequePaymentBean> {

}
