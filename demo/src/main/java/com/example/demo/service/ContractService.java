package com.example.demo.service;

import com.example.demo.dao.ContractDao;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.ContractBean;
import com.example.demo.enums.PaymentStatus;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ContractService {

    private final ContractDao contractDao;
    private final UserDao userDao;

    @Transactional
    public ContractBean createContract(ContractBean contractBean){
        contractDao.create(contractBean);
        return contractBean;
    }

    @Transactional
    public List<ContractBean> approveContract(String chequeId){
        var contracts = contractDao.getContractByChequePaymentId(chequeId);
        if(contracts.isEmpty()){
            return new ArrayList<>();
        }

        for (var contract : contracts){
            contract.setStatus(PaymentStatus.APPROVED);
            contract.setCompletedDate(LocalDateTime.now());
            contractDao.update(contract);
        }

        return contracts;
    }

    @Transactional
    public void cancelContract(String chequeId, String voidedBy){
        var contracts = contractDao.getContractByChequePaymentId(chequeId);
        for (var contract : contracts){
            contract.setStatus(PaymentStatus.VOIDED);
            contract.setVoidedBy(voidedBy);
            contract.setVoidedDate(LocalDateTime.now());
            contractDao.update(contract);
        }
    }

    public List<ContractBean> getContractByUsername(String username){
        var user = userDao.getUserByUsername(username);
        return contractDao.getContractByUserId(user.getId());
    }
}
