package com.example.demo.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ShelfDto {

    private String id;

    private String bookId;

    private String userId;

    private LocalDateTime lastAccessDate;

    private Integer numberOfAccesses;
}
