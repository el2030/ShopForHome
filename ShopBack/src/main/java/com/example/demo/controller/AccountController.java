package com.example.demo.controller;

import com.example.demo.entity.Account;
import com.example.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class AccountController {
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public AccountController(AccountService accountService, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("admin")
    public ResponseEntity<String> registerAdmin(@RequestBody Account account) {
        String password = account.getPassword();
        account.setRole("ADMIN");
        account.setPassword(passwordEncoder.encode(password));
        accountService.createAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).body("Admin created: " + account.getUsername());
    }

    @PostMapping("user")
    public ResponseEntity<String> registerUser(@RequestBody Account account) {
        String password = account.getPassword();
        account.setRole("USER");
        account.setPassword(passwordEncoder.encode(password));
        accountService.createAccount(account);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created: " + account.getUsername());
    }
}
