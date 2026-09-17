package com.example.demo.dao;

import com.example.demo.entity.ShelfBean;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ShelfDao extends GenericDao<ShelfBean,String>{

    public ShelfDao(){
        super(ShelfBean.class);
    }

    public List<ShelfBean> getShelfByUserId(String userId){
        return entityManager
            .createQuery(
                "SELECT s FROM ShelfBean s WHERE s.userId = :userId",
                ShelfBean.class
            )
            .setParameter("userId", userId)
            .getResultList();
    }
}
