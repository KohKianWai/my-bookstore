package com.example.demo.controller;

import com.example.demo.dto.CashAccountTransactionDto;
import com.example.demo.mapper.CashAccountTransactionMapper;
import com.example.demo.service.CashAccountTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CashAccountTransactionController {

    private final CashAccountTransactionService cashAccountTransactionService;
    private final CashAccountTransactionMapper cashAccountTransactionMapper;

    @GetMapping("/{username}")
    public ResponseEntity<Object> getTransactionByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(cashAccountTransactionMapper.toDtoList(cashAccountTransactionService.getTransactionByUsername(username)));
    }

    @PostMapping
    public ResponseEntity<Object> createTransaction(@RequestBody CashAccountTransactionDto cashAccountTransactionDto){
        try{
            cashAccountTransactionService.createCashAccountTransaction(
                cashAccountTransactionMapper.toBean(cashAccountTransactionDto)
            );
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
