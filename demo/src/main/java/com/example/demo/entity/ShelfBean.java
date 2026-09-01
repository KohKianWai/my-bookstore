package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "SHELF")
public class ShelfBean {

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "BOOK_ID")
    private String bookId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "LAST_ACCESS_DATE")
    private LocalDateTime lastAccessDate;

    @Column(name = "NUMBER_OF_ACCESSES")
    private Integer numberOfAccesses;

    @PrePersist
    public void generateId() {
        if (id == null) {
            this.id = "SHELF-" + UUID.randomUUID();
        }
    }
}
