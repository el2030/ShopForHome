package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProductService {
    private final ProductRepository productRepository;
    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public List<Product> findAll(Sort sort) {
        return productRepository.findAll(sort);
    }

    public Product findById(int id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    public Product update(int id, Product product) {
        Product oldProduct = findById(id);
        oldProduct.setName(product.getName());
        oldProduct.setPrice(product.getPrice());
        oldProduct.setStock(product.getStock());
        oldProduct.setCategory(product.getCategory());
        return productRepository.save(oldProduct);
    }

    public String delete(int id) {
        String product = findById(id).getName();
        productRepository.deleteById(id);
        return product + "has been deleted";
    }


}
