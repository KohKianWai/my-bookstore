package com.example.demo.service;

import com.example.demo.dao.ShelfDao;
import com.example.demo.dao.UserDao;
import com.example.demo.entity.ShelfBean;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShelfService {

    private final ShelfDao shelfDao;
    private final UserDao userDao;

    public List<ShelfBean> getShelfByUsername(String username){
        var user = userDao.getUserByUsername(username);
        return shelfDao.getShelfByUserId(user.getId());
    }

    @Transactional
    public void createShelf(ShelfBean shelfBean){
        shelfDao.create(shelfBean);
    }
}
