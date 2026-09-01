package com.example.demo.dto;

import com.example.demo.enums.TransactionFlow;
import com.example.demo.enums.TransactionType;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class CashAccountTransactionDto {

    private String id;

    private String userId;

    private TransactionType transactionType;

    private TransactionFlow transactionFlow;

    private BigDecimal amount;

    private String remarks;

    private LocalDateTime createdDate;

    private String referenceNo;
}
