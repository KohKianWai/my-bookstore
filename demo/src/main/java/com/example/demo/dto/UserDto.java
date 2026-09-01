package com.example.demo.dto;

import com.example.demo.enums.AccountStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class UserDto {

    private String id;

    private String username;

    private String name;

    private String password;

    private String email;

    private AccountStatus status;

    private BigDecimal amount;

    private LocalDateTime createdDate;

    private LocalDateTime updatedDate;

    private LocalDateTime approvedDate;

    private String approvedBy;

    private LocalDateTime lastLoginDate;
}
