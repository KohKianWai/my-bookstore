package com.example.demo.controller;

import com.example.demo.dto.AuthorDto;
import com.example.demo.mapper.AuthorMapper;
import com.example.demo.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/author")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthorController {

    private final AuthorService authorService;
    private final AuthorMapper authorMapper;

    @GetMapping
    public ResponseEntity<Object> getAllAuthors(){
        return ResponseEntity.ok(authorMapper.toDtoList(authorService.getAllAuthors()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getAuthorById(@PathVariable("id") String id){
        return ResponseEntity.ofNullable(authorMapper.toDto(authorService.getAuthorById(id)));
    }

    @PostMapping
    public ResponseEntity<Object> createAuthor(@RequestBody AuthorDto authorDto){
        try {
            authorService.createAuthor(authorMapper.toBean(authorDto));
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateAuthor(@PathVariable("id") String id, @RequestBody AuthorDto authorDto){
        return ResponseEntity.status(
            authorService.updateAuthor(id, authorMapper.toBean(authorDto))
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND
        ).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteAuthor(@PathVariable("id") String id){
        return ResponseEntity.status(
            authorService.deleteAuthorById(id)
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND
        ).build();
    }
}
