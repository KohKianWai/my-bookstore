package com.example.demo.dto;

import com.example.demo.enums.PaymentStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ChequePaymentDto {

    private String id;

    private String chequeNumber;

    private String userId;

    private BigDecimal amount;

    private PaymentStatus status;

    private LocalDateTime createdDate;

    private LocalDateTime approvedDate;

    private String approvedBy;

    private LocalDateTime voidedDate;

    private String voidedBy;
}
