package com.example.demo.dao;

import com.example.demo.entity.ContractBean;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ContractDao extends GenericDao<ContractBean,String>{
    public ContractDao(){
        super(ContractBean.class);
    }

    public List<ContractBean> getContractByChequePaymentId(String chequePaymentId) {
        return entityManager
            .createQuery(
                "SELECT c FROM ContractBean c WHERE c.chequePaymentId = :chequePaymentId",
                ContractBean.class
            )
            .setParameter("chequePaymentId", chequePaymentId)
            .getResultList();
    }

    public List<ContractBean> getContractByUserId(String userId) {
        return entityManager
            .createQuery(
                "SELECT c FROM ContractBean c WHERE c.userId = :userId",
                ContractBean.class
            )
            .setParameter("userId", userId)
            .getResultList();
    }
}
