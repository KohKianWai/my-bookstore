package com.example.demo.service;

import com.example.demo.dao.ModeratorDao;
import com.example.demo.entity.ModeratorBean;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ModeratorService {

    private final ModeratorDao moderatorDao;

    @Transactional
    public void createModerator(ModeratorBean moderatorBean){
        moderatorDao.create(moderatorBean);
    }
}
