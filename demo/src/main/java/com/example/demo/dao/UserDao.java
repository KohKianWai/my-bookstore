package com.example.demo.dao;

import com.example.demo.entity.UserBean;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class UserDao extends GenericDao<UserBean, String>{

    public UserDao(){
        super(UserBean.class);
    }

    public UserBean getUserByName(String username){
        List<UserBean> users = entityManager
            .createQuery(
                "SELECT u FROM UserBean u WHERE u.username = :username",
                UserBean.class
            )
            .setParameter("username", username)
            .getResultList();

        return users.isEmpty() ? null : users.get(0);
    }
}
