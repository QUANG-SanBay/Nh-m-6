package com.schoolhealth.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.service.HoSoSucKhoeService;

@RestController
@RequestMapping("/api/hoso-suckhoe")
@CrossOrigin(origins = "http://localhost:3000")
public class HoSoSucKhoeController {

    @Autowired
    private HoSoSucKhoeService hoSoSucKhoeService;

    // ✅ Lấy hoặc tạo hồ sơ sức khỏe (trả về 1 DTO cho frontend hiển thị form)
    @GetMapping("/hocsinh/{maHocSinh}")
    public ResponseEntity<?> getOrCreateHealthProfile(@PathVariable String maHocSinh) {
        try {
            HoSoSucKhoeDTO dto = hoSoSucKhoeService.getOrCreateHealthProfile(maHocSinh);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Cập nhật hồ sơ sức khỏe từ học sinh (POST)
    @PostMapping
    public ResponseEntity<?> updateHoSoFromHocSinh(@RequestBody HoSoSucKhoeDTO dto) {
        try {
            HoSoSucKhoeDTO updated = hoSoSucKhoeService.updateFromStudent(dto);
            return ResponseEntity.ok(Map.of(
                "message", "Cập nhật hồ sơ sức khỏe thành công",
                "data", updated
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ PUT: cập nhật hồ sơ có mã cụ thể (nếu cần dùng PUT)
    @PutMapping("/{maHoSo}")
    public ResponseEntity<?> updateHoSoById(@PathVariable String maHoSo, @RequestBody HoSoSucKhoeDTO dto) {
        try {
            dto.setMaHoSo(UUID.fromString(maHoSo));
            HoSoSucKhoeDTO updated = hoSoSucKhoeService.updateFromStudent(dto);
            return ResponseEntity.ok(Map.of(
                "message", "Cập nhật hồ sơ sức khỏe thành công",
                "data", updated
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
