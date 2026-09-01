package com.example.demo.dao;

import com.example.demo.entity.ContractBean;
import org.springframework.stereotype.Repository;

@Repository
public class ContractDao extends GenericDao<ContractBean,String>{
    public ContractDao(){
        super(ContractBean.class);
    }

}
