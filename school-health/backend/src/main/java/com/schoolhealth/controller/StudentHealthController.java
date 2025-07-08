package com.schoolhealth.controller;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.service.HoSoSucKhoeService;

@RestController
@RequestMapping("/api/student-health")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentHealthController {

    @Autowired
    private HoSoSucKhoeService hoSoSucKhoeService;

    @PutMapping("/{maHoSo}")
    public ResponseEntity<?> updateHealthFromStudent(@PathVariable String maHoSo, @RequestBody HoSoSucKhoeDTO dto) {
        try {
            dto.setMaHoSo(UUID.fromString(maHoSo));
            HoSoSucKhoeDTO updated = hoSoSucKhoeService.updateFromStudent(dto);
            return ResponseEntity.ok(Map.of(
                "message", "✅ Cập nhật từ học sinh thành công",
                "data", updated
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 
