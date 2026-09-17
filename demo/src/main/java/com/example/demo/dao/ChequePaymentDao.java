package com.example.demo.dao;

import com.example.demo.entity.ChequePaymentBean;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ChequePaymentDao extends GenericDao<ChequePaymentBean,String>{
    public ChequePaymentDao(){
        super(ChequePaymentBean.class);
    }

    public List<ChequePaymentBean> getChequePaymentByUserId(String userId) {
        return entityManager
            .createQuery(
                "SELECT c FROM ChequePaymentBean c WHERE c.userId = :userId",
                ChequePaymentBean.class
            )
            .setParameter("userId", userId)
            .getResultList();
    }
}