package com.example.demo.dao;

import com.example.demo.entity.ModeratorBean;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ModeratorDao extends GenericDao<ModeratorBean, String> {

    public ModeratorDao() {
        super(ModeratorBean.class);
    }

    public ModeratorBean getModeratorByName(String username){
        List<ModeratorBean> moderators = entityManager.createQuery(
            "SELECT m FROM ModeratorBean m WHERE m.username = :username",
            ModeratorBean.class
        )
            .setParameter("username", username)
            .getResultList();

        return moderators.isEmpty() ? null : moderators.get(0);
    }
}
