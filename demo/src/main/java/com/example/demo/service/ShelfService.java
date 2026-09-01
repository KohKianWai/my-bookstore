package com.example.demo.service;

import com.example.demo.dao.ShelfDao;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ShelfService {

    private final ShelfDao shelfDao;
}
