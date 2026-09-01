package com.example.demo.dto;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class LoginResponseDto {

    private String username;
    private String role;
}
