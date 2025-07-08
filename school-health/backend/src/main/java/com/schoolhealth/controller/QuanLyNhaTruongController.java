package com.schoolhealth.controller;

import com.schoolhealth.entity.QuanLyNhaTruong;
import com.schoolhealth.service.QuanLyNhaTruongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/quan-ly-nha-truong")
@CrossOrigin(origins = "http://localhost:3000")
public class QuanLyNhaTruongController {

    @Autowired
    private QuanLyNhaTruongService quanLyNhaTruongService;

    @GetMapping
    public ResponseEntity<List<QuanLyNhaTruong>> getAll() {
        return ResponseEntity.ok(quanLyNhaTruongService.getAllQuanLyNhaTruong());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        Optional<QuanLyNhaTruong> result = quanLyNhaTruongService.getQuanLyNhaTruongById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody QuanLyNhaTruong qlnt) {
        return ResponseEntity.ok(quanLyNhaTruongService.saveQuanLyNhaTruong(qlnt));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody QuanLyNhaTruong qlnt) {
        return ResponseEntity.ok(quanLyNhaTruongService.updateQuanLyNhaTruong(id, qlnt));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            quanLyNhaTruongService.deleteQuanLyNhaTruong(id);
            return ResponseEntity.ok(Map.of("message", "Xoá thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
