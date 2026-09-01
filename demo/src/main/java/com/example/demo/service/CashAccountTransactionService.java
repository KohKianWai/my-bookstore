package com.example.demo.service;

import com.example.demo.dao.CashAccountTransactionDao;
import com.example.demo.dto.CashAccountTransactionDto;
import com.example.demo.entity.CashAccountTransactionBean;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CashAccountTransactionService {

    private final CashAccountTransactionDao cashAccountTransactionDao;

    @Transactional
    public void createCashAccountTransaction(CashAccountTransactionBean cashAccountTransactionBean) {
        cashAccountTransactionDao.create(cashAccountTransactionBean);
    }

    @Transactional
    public boolean deleteCashAccountTransactionById(String id) {
        var cashAccountTransactionBean = cashAccountTransactionDao.get(id);
        if(cashAccountTransactionBean == null){
            return false;
        }

        cashAccountTransactionDao.delete(cashAccountTransactionBean);
        return true;
    }

    @Transactional
    public boolean updateCashAccountTransaction(String id, CashAccountTransactionDto dto) {
        var cashAccountTransactionBean = cashAccountTransactionDao.get(id);
        if(cashAccountTransactionBean == null){
            return false;
        }

        cashAccountTransactionBean.setAmount(dto.getAmount());
        cashAccountTransactionBean.setRemarks(dto.getRemarks());
        cashAccountTransactionBean.setCreatedDate(dto.getCreatedDate());
        cashAccountTransactionDao.update(cashAccountTransactionBean);
        return true;
    }
}
