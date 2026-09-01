package com.example.demo.mapper;

import java.util.List;

public interface GenericMapper<D, B> {

    D toDto(B bean);

    B toBean(D dto);

    List<D> toDtoList(List<B> beanList);

    List<B> toBeanList(List<D> dtoList);
}
