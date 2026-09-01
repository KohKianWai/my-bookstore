package com.example.demo.entity;

import com.example.demo.enums.PaymentStatus;
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
@Table(name = "CHEQUE_PAYMENT")
public class ChequePaymentBean {

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "CHEQUE_NUMBER")
    private String chequeNumber;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "AMOUNT")
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private PaymentStatus status;

    @Column(name = "CREATED_DATE")
    private LocalDateTime createdDate;

    @Column(name = "APPROVED_DATE")
    private LocalDateTime approvedDate;

    @Column(name = "APPROVED_BY")
    private String approvedBy;

    @Column(name = "VOIDED_DATE")
    private LocalDateTime voidedDate;

    @Column(name = "VOIDED_BY")
    private String voidedBy;

    @PrePersist
    public void generateId() {
        if (id == null) {
            this.id = "CHEQUE-" + UUID.randomUUID();
        }
    }

}
