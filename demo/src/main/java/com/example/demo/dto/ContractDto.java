package com.example.demo.dto;

import com.example.demo.enums.PaymentMethod;
import com.example.demo.enums.PaymentStatus;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ContractDto {

    private String id;

    private String userId;

    private String bookId;

    private PaymentMethod paymentMethod;

    private String chequePaymentId;

    private PaymentStatus status;

    private LocalDateTime createdDate;

    private LocalDateTime completedDate;

    private LocalDateTime voidedDate;

    private String voidedBy;
}
