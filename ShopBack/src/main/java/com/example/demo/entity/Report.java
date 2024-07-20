package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity@Setter@Getter
public class Report {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private Date date;
    private String account;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "report_product", joinColumns = @JoinColumn(name = "report_id"), inverseJoinColumns = {
            @JoinColumn(name = "product_id")
    })
    private List<Product> products = new ArrayList<>();

}
