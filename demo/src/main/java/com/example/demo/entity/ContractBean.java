package com.example.demo.entity;

import com.example.demo.enums.PaymentMethod;
import com.example.demo.enums.PaymentStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@Table(name = "CONTRACT")
public class ContractBean {

    @Id
    @Column(name = "ID")
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(name = "PAYMENT_METHOD")
    private PaymentMethod paymentMethod;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "BOOK_ID")
    private String bookId;

    @Column(name = "CHEQUE_PAYMENT_ID")
    private String chequePaymentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private PaymentStatus status;

    @Column(name = "CREATED_DATE")
    private LocalDateTime createdDate;

    @Column(name = "COMPLETED_DATE")
    private LocalDateTime completedDate;

    @Column(name = "VOIDED_DATE")
    private LocalDateTime voidedDate;

    @Column(name = "VOIDED_BY")
    private String voidedBy;

    @PrePersist
    public void generateId() {
        if (id == null) {
            this.id = "CONTRACT-" + UUID.randomUUID();
        }
    }

}
