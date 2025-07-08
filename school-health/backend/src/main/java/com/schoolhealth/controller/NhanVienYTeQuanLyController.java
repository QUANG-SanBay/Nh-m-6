package com.schoolhealth.controller;

import com.schoolhealth.entity.NhanVienYTe;
import com.schoolhealth.service.NhanVienYTeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/nhan-vien-y-te")
@CrossOrigin(origins = "http://localhost:3000")
public class NhanVienYTeQuanLyController {  // ✅ Đổi tên ở đây

    @Autowired
    private NhanVienYTeService nhanVienYTeService;

    @GetMapping
    public ResponseEntity<List<NhanVienYTe>> getAll() {
        return ResponseEntity.ok(nhanVienYTeService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        Optional<NhanVienYTe> result = nhanVienYTeService.findById(id);
        return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody NhanVienYTe nvyt) {
        return ResponseEntity.ok(nhanVienYTeService.save(nvyt));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody NhanVienYTe nvyt) {
        nvyt.setMaNhanVienYTe(id);
        return ResponseEntity.ok(nhanVienYTeService.save(nvyt));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            nhanVienYTeService.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Xoá thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
