package com.example.demo.controller;

import com.example.demo.dto.BookDto;
import com.example.demo.entity.BookBean;
import com.example.demo.mapper.BookMapper;
import com.example.demo.service.BookService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/book")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;
    private final BookMapper bookMapper;

    @GetMapping
    public ResponseEntity<Object> getAllBooks(){
        return ResponseEntity.ok(
            bookMapper.toDtoList(bookService.getAllBooks())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getBookById(@PathVariable("id") String id){
        return ResponseEntity.ofNullable(
            bookMapper.toDto(bookService.getBookById(id))
        );
    }

    @GetMapping("/{id}/cover-image")
    public ResponseEntity<Object> getBookCoverImage(@PathVariable("id") String id){
        BookBean book = bookService.getBookById(id);

        if (book == null || book.getCoverImage() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_PNG)
            .body(book.getCoverImage());
    }

    @PostMapping
    public ResponseEntity<Object> createBook(@RequestBody BookDto bookDto){
        try {
            var bookBean = bookService.createBook(
                bookMapper.toBean(bookDto)
            );
            return new ResponseEntity<>(bookBean, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @PostMapping("/{id}/content")
    public ResponseEntity<Object> uploadBookContent(@PathVariable("id") String id, @RequestParam("file") MultipartFile file){
        try {
            bookService.uploadContent(id, file.getBytes());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/cover-image")
    public ResponseEntity<Object> uploadBookCoverImage(@PathVariable("id") String id, @RequestParam("cover-image") MultipartFile file){
        try {
            bookService.uploadCoverImage(id, file.getBytes());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateBook(
        @PathVariable("id") String id,
        @RequestBody BookDto bookDto){

        return ResponseEntity.status(
            bookService.updateBook(
                id,
                bookMapper.toBean(bookDto)
            )
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND
        ).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable("id") String id){
        return ResponseEntity.status(
            bookService.deleteBookById(id)
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND
        ).build();
    }
}
