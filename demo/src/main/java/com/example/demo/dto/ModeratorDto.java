package com.example.demo.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ModeratorDto {

    private String id;

    private String username;

    private String password;

    private LocalDateTime lastLoginDate;

}
