package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<String> addProduct(@RequestBody Product product) {
        productService.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(product + " added successfully");
    }

    @GetMapping("all")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product product) {
        productService.update(id, product);
        return ResponseEntity.ok(product + " updated successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        productService.delete(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @GetMapping("/categories")
    public ResponseEntity<Set<String>> getProductCategory() {
        Set<String> categories = productService.findAll()
                .stream()
                .map(Product::getCategory)
                .collect(Collectors.toSet());
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> getProductCategoryByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "10") int limit
    ) {
        List<Product> products;

        if (category.equals("ALL")) {
            products = productService.findAll(Sort.by(Sort.Direction.fromString(sort), sortBy));
        } else {
            products = productService.findAll()
                    .stream()
                    .filter(product -> product.getCategory().equals(category))
                    .sorted((p1, p2) -> {
                        if (sort.equals("asc")) {
                            return p1.getName().compareTo(p2.getName());
                        } else {
                            return p2.getName().compareTo(p1.getName());
                        }
                    })
                    .collect(Collectors.toList());
        }
        if (products.size() > limit) {
            products = products.subList(0, limit);
        }
        return ResponseEntity.ok(products);
    }



    @PostMapping("upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Product> productList = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            StringBuilder contentBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                contentBuilder.append(line).append("\n");
            }
            String fileContent = contentBuilder.toString().trim();
            if (fileContent.isEmpty()) {
                return new ResponseEntity<>("File content is empty", HttpStatus.BAD_REQUEST);
            }

            Product[] products = objectMapper.readValue(fileContent, Product[].class);

            for (Product product : products) {
                productList.add(product);
            }


            for (Product product : productList) {
                Product newProduct = new Product();
               newProduct.setCategory(product.getCategory());
               newProduct.setName(product.getName());
               newProduct.setPrice(product.getPrice());
               newProduct.setDescription(product.getDescription());
               newProduct.setStock(product.getStock());
               productService.save(newProduct);
            }

            return ResponseEntity.ok("Product properties stored successfully");
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to read file content", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
