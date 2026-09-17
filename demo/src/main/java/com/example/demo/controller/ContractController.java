package com.example.demo.controller;

import com.example.demo.dto.ContractDto;
import com.example.demo.mapper.ContractMapper;
import com.example.demo.service.ContractService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contract")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;
    private final ContractMapper contractMapper;

    @GetMapping("/{username}")
    public ResponseEntity<Object> getContractByUsername(@PathVariable("username") String username){
        return ResponseEntity.ok(contractMapper.toDtoList(contractService.getContractByUsername(username)));
    }

    @PostMapping
    public ResponseEntity<Object> createContract(@RequestBody ContractDto contractDto){
        try {
            var contractBean = contractService.createContract(
                contractMapper.toBean(contractDto)
            );
            return new ResponseEntity<>(contractBean, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{cheque-id}/approve")
    public ResponseEntity<Object> approveContract(@PathVariable("cheque-id") String chequeId){
        return ResponseEntity.ok(contractMapper.toDtoList(contractService.approveContract(chequeId)));
    }

    @PutMapping("/{cheque-id}/cancel")
    public ResponseEntity<Object> cancelContract(@PathVariable("cheque-id") String chequeId, @RequestParam("voidedBy") String voidedBy){
        contractService.cancelContract(chequeId, voidedBy);
        return ResponseEntity.ok().build();
    }
}
