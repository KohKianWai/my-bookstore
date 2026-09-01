package com.example.demo.service;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.UserBean;
import com.example.demo.enums.AccountStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserDao userDao;

    public List<UserBean> getAllUsers(){
        return userDao.findAll();
    }

    @Transactional
    public void createUser(UserBean userBean){
        userBean.setCreatedDate(LocalDateTime.now());
        userBean.setStatus(AccountStatus.PENDING);
        userBean.setAmount(BigDecimal.ZERO);
        userDao.create(userBean);
    }

    @Transactional
    public boolean updateUser(String id, UserBean userBean){
        var user = userDao.get(id);
        if (user == null) {
            return false;
        }

        user.setStatus(userBean.getStatus());
        user.setPassword(userBean.getPassword());
        user.setAmount(userBean.getAmount());
        user.setLastLoginDate(userBean.getLastLoginDate());
        user.setApprovedBy(userBean.getApprovedBy());
        user.setApprovedDate(userBean.getApprovedDate());
        user.setUpdatedDate(userBean.getUpdatedDate());
        userDao.update(user);
        return true;
    }

}
