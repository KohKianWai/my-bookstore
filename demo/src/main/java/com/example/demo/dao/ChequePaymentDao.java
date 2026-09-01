package com.example.demo.dao;

import com.example.demo.entity.ChequePaymentBean;
import org.springframework.stereotype.Repository;

@Repository
public class ChequePaymentDao extends GenericDao<ChequePaymentBean,String>{
    public ChequePaymentDao(){
        super(ChequePaymentBean.class);
    }
}