package com.example.demo.controller;

import com.example.demo.dto.ChequePaymentDto;
import com.example.demo.mapper.ChequePaymentMapper;
import com.example.demo.service.ChequePaymentService;
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
@RequestMapping("/api/cheque")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ChequePaymentController {

    private final ChequePaymentService chequePaymentService;
    private final UserService userService;
    private final ChequePaymentMapper chequePaymentMapper;

    @GetMapping
    public ResponseEntity<Object> getAllChequePayments(){
        return ResponseEntity.ok(
            chequePaymentMapper.toDtoList(chequePaymentService.getAllChequePayments())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getChequePaymentById(@PathVariable("id") String id){
        return ResponseEntity.ok(
            chequePaymentMapper.toDto(chequePaymentService.getChequePaymentById(id))
        );
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<Object> getChequePaymentByUsername(@PathVariable("username") String username) {
        var user = userService.getUserByUsername(username);
        return ResponseEntity.ok(
            chequePaymentMapper.toDtoList(chequePaymentService.getChequePaymentByUserId(user.getId()))
        );
    }

    @PostMapping
    public ResponseEntity<Object> createChequePayment(@RequestBody ChequePaymentDto chequePaymentDto){
        try {
            var chequePaymentBean = chequePaymentService.createChequePayment(
                chequePaymentMapper.toBean(chequePaymentDto)
            );
            return new ResponseEntity<>(
                chequePaymentMapper.toDto(chequePaymentBean),
                HttpStatus.CREATED
            );
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateChequePayment(@PathVariable("id") String id, @RequestBody ChequePaymentDto chequePaymentDto){
        return ResponseEntity.status(
                chequePaymentService.updateChequePayment(
                    id,
                    chequePaymentMapper.toBean(chequePaymentDto))
                    ? HttpStatus.OK
                    : HttpStatus.NOT_FOUND
            )
            .build();
    }

}
