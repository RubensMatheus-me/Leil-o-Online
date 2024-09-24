package com.project.leilao.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1")
public class Index {
    @GetMapping("/")
    public String index() {
        return "Olá mundo Spring Field";
    }

    @GetMapping("/test")
    public String indexTest() {
        return "test";
    }
    @GetMapping("/esqueca")
    public String esqueca() {
        return "esqueca";
    }

    @PostMapping
    public String save() {
        return "salvado";
    }
}
