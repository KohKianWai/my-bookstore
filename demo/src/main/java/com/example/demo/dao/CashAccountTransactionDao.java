package com.example.demo.dao;

import com.example.demo.entity.CashAccountTransactionBean;
import org.springframework.stereotype.Repository;

@Repository
public class CashAccountTransactionDao extends GenericDao<CashAccountTransactionBean, String> {

    public CashAccountTransactionDao(){
        super(CashAccountTransactionBean.class);
    }
}
