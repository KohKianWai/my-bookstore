package com.example.demo.dao;

import com.example.demo.entity.BookBean;
import org.springframework.stereotype.Repository;

@Repository
public class BookDao extends GenericDao<BookBean, String> {

    public BookDao(){
        super(BookBean.class);
    }
}
