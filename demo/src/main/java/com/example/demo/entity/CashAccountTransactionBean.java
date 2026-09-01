package com.example.demo.entity;

import com.example.demo.enums.TransactionFlow;
import com.example.demo.enums.TransactionType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@Table(name = "CASH_ACCOUNT_TRANSACTION")
public class CashAccountTransactionBean {

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "USER_ID")
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "TRANSACTION_TYPE")
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    @Column(name = "TRANSACTION_FLOW")
    private TransactionFlow transactionFlow;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    @Column(name = "REMARKS")
    private String remarks;

    @Column(name = "CREATED_DATE")
    private LocalDateTime createdDate;

    @Column(name = "REFERENCE_NO")
    private String referenceNo;

    @PrePersist
    public void generateId() {
        if (id == null) {
            this.id = "TRANSACTION-" + UUID.randomUUID();
        }
    }

}
