package com.example.demo.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class BookDto {

    private String id;

    private String name;

    private String subject;

    private String description;

    private byte[] content;

    private byte[] coverImage;

    private String contentType;

    private String authorId;

    private String categoryId;

    private BigDecimal price;
}
