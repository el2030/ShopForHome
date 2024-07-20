package com.example.demo.service;

public class ItemGenerator {

    public static String generateName() {
        return "Product" + (int) (Math.random() * 1000);
    }

    public static String generateDescription() {
        return "Description of product";
    }

    public static int generatePrice() {
        return 10 + (int)(Math.random() * 990);
    }

    public static int generateStock() {
        return (int) (1 + Math.random() * 100);
    }
}
