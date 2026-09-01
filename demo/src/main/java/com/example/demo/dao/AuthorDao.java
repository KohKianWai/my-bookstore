package com.example.demo.dao;

import com.example.demo.entity.AuthorBean;
import org.springframework.stereotype.Repository;

@Repository
public class AuthorDao extends GenericDao<AuthorBean, String> {

    public AuthorDao(){
        super(AuthorBean.class);
    }
}
