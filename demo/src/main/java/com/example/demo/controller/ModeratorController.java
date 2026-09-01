package com.example.demo.controller;

import com.example.demo.dto.ModeratorDto;
import com.example.demo.mapper.ModeratorMapper;
import com.example.demo.service.ModeratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/moderator")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ModeratorController {

    private final ModeratorService moderatorService;
    private final ModeratorMapper moderatorMapper;

    @PostMapping
    public ResponseEntity<Object> createModerator(@RequestBody ModeratorDto moderatorDto){
        try {
            moderatorService.createModerator(moderatorMapper.toBean(moderatorDto));
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
