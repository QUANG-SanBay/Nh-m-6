package com.schoolhealth.controller.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.entity.QuanLyNhaTruong;
import com.schoolhealth.repository.QuanLyNhaTruongRepository;

@RestController
@RequestMapping("/api/manager")
public class QuanLyNhaTruongController {
    @Autowired
    private QuanLyNhaTruongRepository quanLyNhaTruongRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String username) {
        QuanLyNhaTruong manager = quanLyNhaTruongRepository.findByTenDangNhap(username);
        if (manager == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(manager);
    }
}