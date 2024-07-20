package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity@Getter@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String category;
    private int price;
    private int stock;
    private int quantity;
    private String description;
//    @ManyToMany(mappedBy = "cart")
//    private List<Account> accounts;
}
