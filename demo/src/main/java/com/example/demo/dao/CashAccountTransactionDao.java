package com.example.demo.dao;

import com.example.demo.entity.CashAccountTransactionBean;
import com.example.demo.entity.ContractBean;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class CashAccountTransactionDao extends GenericDao<CashAccountTransactionBean, String> {

    public CashAccountTransactionDao(){
        super(CashAccountTransactionBean.class);
    }

    public List<CashAccountTransactionBean> getTransactionByUserId(String userId) {
        return entityManager
            .createQuery(
                "SELECT c FROM CashAccountTransactionBean c WHERE c.userId = :userId",
                CashAccountTransactionBean.class
            )
            .setParameter("userId", userId)
            .getResultList();
    }
}
