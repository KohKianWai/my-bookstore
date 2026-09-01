package com.example.demo.dao;

import com.example.demo.entity.ShelfBean;
import org.springframework.stereotype.Repository;

@Repository
public class ShelfDao extends GenericDao<ShelfBean,String>{

    public ShelfDao(){
        super(ShelfBean.class);
    }
}
