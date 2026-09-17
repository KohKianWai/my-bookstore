package com.example.demo.controller;

import com.example.demo.dto.ShelfDto;
import com.example.demo.mapper.ShelfMapper;
import com.example.demo.service.ShelfService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shelf")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ShelfController {

    private final ShelfService shelfService;
    private final ShelfMapper shelfMapper;

    @GetMapping("/{username}")
    public ResponseEntity<Object> getShelfByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(shelfMapper.toDtoList(shelfService.getShelfByUsername(username)));
    }

    @PostMapping
    public ResponseEntity<Object> createShelf(@RequestBody ShelfDto shelfDto){
        try {
            shelfService.createShelf(shelfMapper.toBean(shelfDto));
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
