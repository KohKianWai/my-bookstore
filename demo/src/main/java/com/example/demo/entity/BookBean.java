package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
@Table(name = "BOOK")
public class BookBean {

    @Id
    @Column(name = "ID")
    private String id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "SUBJECT")
    private String subject;

    @Lob
    @Column(name = "DESCRIPTION")
    private String description;

    @Lob
    @Column(name = "CONTENT")
    private byte[] content;

    @Lob
    @Column(name = "COVER_IMAGE")
    private byte[] coverImage;

    @Column(name = "CONTENT_TYPE")
    private String contentType;

    @Column(name = "AUTHOR_ID")
    private String authorId;

    @Column(name = "CATEGORY_ID")
    private String categoryId;

    @Column(name = "CREATED_DATE")
    private LocalDateTime createdDate;

    @Column(name = "PRICE")
    private BigDecimal price;

    @PrePersist
    public void setID() {
        if (this.id == null) {
            this.id = "BOOK-" + UUID.randomUUID();
        }
    }

}
