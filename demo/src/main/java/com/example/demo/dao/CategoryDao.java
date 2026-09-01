package com.example.demo.dao;

import com.example.demo.entity.CategoryBean;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryDao extends GenericDao<CategoryBean, String>{
    public CategoryDao(){
        super(CategoryBean.class);
    }
}
