package com.example.demo.controller;

import com.example.demo.entity.Account;
import com.example.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")

public class AdminController {
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public AdminController(AccountService accountService, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("accounts")
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @DeleteMapping ("accounts/{id}")
    public ResponseEntity<String> deleteAccount(@PathVariable Integer id) {
        String deletedUsername = accountService.deleteAccountById(id);
        if (deletedUsername != null) {
            String message = "Account for user " + deletedUsername + " deleted successfully.";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found for the provided ID.");
        }
    }

    @PutMapping("accounts/{id}")
    public ResponseEntity<String> updateAccount(@PathVariable Integer id, @RequestBody Account account) {
        String password = account.getPassword();
        account.setPassword(passwordEncoder.encode(password));
        accountService.updateAccountById(id, account);
        return ResponseEntity.status(HttpStatus.OK).body("Account for user " + id + " updated successfully.");
    }
}
