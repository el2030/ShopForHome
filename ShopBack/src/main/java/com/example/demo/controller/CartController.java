package com.example.demo.controller;
import com.example.demo.entity.Account;
import com.example.demo.entity.Product;
import com.example.demo.service.AccountService;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    private final AccountService accountService;
    private final ProductService productService;
    @Autowired
    public CartController(AccountService accountService, ProductService productService) {
        this.productService = productService;
        this.accountService = accountService;
    }

    @PostMapping("account/{username}/product/{productId}/{quantity}")
    public ResponseEntity<String> addCart(@PathVariable("productId") Integer productId, @PathVariable("username") String username, @PathVariable("quantity") Integer quantity) {
        Account account = accountService.getAccountByUsername(username);
        Product product = productService.findById(productId);
        product.setQuantity(quantity);
        while (account.getCart().contains(product)){
            account.getCart().remove(product);
        }
        account.getCart().add(product);
        accountService.updateAccountByUsername(username,account);
        return ResponseEntity.status(HttpStatus.CREATED).body(product + " has been added to the cart");
    }

    @GetMapping("{username}")
    public List<Product> getCart(@PathVariable("username") String username) {
        Account account = accountService.getAccountByUsername(username);
        return account.getCart();
    }

}
