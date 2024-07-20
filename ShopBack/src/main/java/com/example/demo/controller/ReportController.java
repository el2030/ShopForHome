package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.entity.Report;
import com.example.demo.service.ProductService;
import com.example.demo.service.ReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/report")
public class ReportController {
    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);
    private final ReportService reportService;
    private final ProductService productService;

    @Autowired
    public ReportController(ReportService reportService, ProductService productService) {
        this.reportService = reportService;
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Object> report(@RequestBody List<Map<String, Object>> report) {
        List<Product> newList = new ArrayList<>();
        for (Map<String, Object> product : report) {
            Product newProduct = productService.findById((int)product.get("id"));
            newProduct.setQuantity((int) product.get("quantity"));
            newList.add(newProduct);
        }
        Report newReport = new Report();
        newReport.setProducts(newList);
        newReport.setDate(new Date());
        System.out.println(newReport);
        reportService.save(newReport);
        return ResponseEntity.ok(newReport);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Report>> getReport() {
        List<Report> reports = reportService.findAll();
        return ResponseEntity.ok(reports);
    }
}
