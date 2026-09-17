package com.example.demo.service;

import com.example.demo.dao.ChequePaymentDao;
import com.example.demo.entity.ChequePaymentBean;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.filters.ExpiresFilter.Duration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChequePaymentService {

    private final ChequePaymentDao chequePaymentDao;

    @Transactional
    public ChequePaymentBean createChequePayment(ChequePaymentBean chequePaymentBean){
        chequePaymentDao.create(chequePaymentBean);
        return chequePaymentBean;
    }

    public List<ChequePaymentBean> getAllChequePayments(){
        return chequePaymentDao.findAll();
    }

    public List<ChequePaymentBean> getChequePaymentByUserId(String userId){
        return chequePaymentDao.getChequePaymentByUserId(userId);
    }

    public ChequePaymentBean getChequePaymentById(String id){
        return chequePaymentDao.get(id);
    }

    @Transactional
    public boolean updateChequePayment(String id, ChequePaymentBean chequePaymentBean){
        var chequePayment = chequePaymentDao.get(id);
        if(chequePayment == null){
            return false;
        }

        chequePayment.setAmount(chequePaymentBean.getAmount());
        chequePayment.setStatus(chequePaymentBean.getStatus());
        chequePayment.setCreatedDate(chequePaymentBean.getCreatedDate());
        chequePayment.setApprovedDate(chequePaymentBean.getApprovedDate());
        chequePayment.setApprovedBy(chequePaymentBean.getApprovedBy());
        chequePayment.setVoidedDate(chequePaymentBean.getVoidedDate());
        chequePayment.setVoidedBy(chequePaymentBean.getVoidedBy());
        chequePaymentDao.update(chequePayment);
        return true;
    }
}
