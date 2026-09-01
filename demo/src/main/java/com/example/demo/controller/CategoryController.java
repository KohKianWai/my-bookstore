package com.example.demo.controller;

import com.example.demo.dto.CategoryDto;
import com.example.demo.mapper.CategoryMapper;
import com.example.demo.service.CategoryService;
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
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @GetMapping
    public ResponseEntity<Object> getAllCategories(){
        return ResponseEntity.ok(
            categoryMapper.toDtoList(categoryService.getAllCategories())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCategoryById(@PathVariable("id") String id){
        return ResponseEntity.ofNullable(
            categoryMapper.toDto(categoryService.getCategoryById(id))
        );
    }

    @PostMapping
    public ResponseEntity<Object> createCategory(@RequestBody CategoryDto categoryDto){
        try {
            categoryService.createCategory(
                categoryMapper.toBean(categoryDto)
            );
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateCategory(
        @PathVariable("id") String id,
        @RequestBody CategoryDto categoryDto){

        return ResponseEntity.status(
            categoryService.updateCategory(
                id,
                categoryMapper.toBean(categoryDto)
            )
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND
        ).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteCategory(@PathVariable("id") String id){
        return ResponseEntity.status(
            categoryService.deleteCategoryById(id)
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND
        ).build();
    }
}
