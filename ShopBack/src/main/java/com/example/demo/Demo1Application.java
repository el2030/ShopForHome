package com.example.demo;

import com.example.demo.entity.Account;
import com.example.demo.entity.Product;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.AccountService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.Random;

import static com.example.demo.service.ItemGenerator.*;


@SpringBootApplication
public class Demo1Application implements CommandLineRunner {

    private final AccountService accountService;
    private final ProductService productService;
    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(Demo1Application.class, args);
    }

    @Autowired
    public Demo1Application(AccountService accountService, ProductService productService, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.productService = productService;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void run(String... args) throws Exception {
        String[] categories = {"Electronics", "Kitchen", "Furniture", "Appliances", "Tools"};
        Random random = new Random();
        if (accountService.getAllAccounts().isEmpty()){
            Account adminAccount = new Account();
            adminAccount.setUsername("admin");
            adminAccount.setPassword(passwordEncoder.encode("admin"));
            adminAccount.setRole("ADMIN");
            adminAccount.setEmail("admin@gmail.com");
            Account userAccount = new Account();
            userAccount.setUsername("user");
            userAccount.setPassword(passwordEncoder.encode("user"));
            userAccount.setRole("USER");
            userAccount.setEmail("user@gmail.com");
            accountService.createAccount(adminAccount);
            accountService.createAccount(userAccount);
        }

        if (productService.findAll().isEmpty()){
            for (int i = 0; i < 50; i++) {
                Product product = new Product();
                product.setName(generateName());
                product.setDescription(generateDescription());
                product.setCategory(categories[random.nextInt(categories.length)]);
                product.setPrice(generatePrice());
                product.setStock(generateStock());
                productService.save(product);
            }
        }
    }
}
