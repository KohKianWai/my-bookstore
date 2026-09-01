package com.example.demo.controller;

import com.example.demo.dto.UserDto;
import com.example.demo.mapper.UserMapper;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping
    public ResponseEntity<Object> getAllUsers(){
        return ResponseEntity.ok(
            userMapper.toDtoList(userService.getAllUsers())
        );
    }

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody UserDto userDto){
        try {
            userService.createUser(userMapper.toBean(userDto));
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateUser(@PathVariable("id") String id, @RequestBody UserDto userDto){
        return ResponseEntity.status(
            userService.updateUser(
                id,
                userMapper.toBean(userDto)
            )   ? HttpStatus.OK
                : HttpStatus.NOT_FOUND
        ).build();
    }


}
