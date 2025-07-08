package com.schoolhealth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.service.StudentHealthService;

@RestController
@RequestMapping("/api/student/health-profile")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentHealthController {

    @Autowired
    private StudentHealthService studentHealthService;

    // ✅ Lấy hồ sơ sức khỏe của học sinh (1 bản ghi duy nhất)
    @GetMapping("/{maHocSinh}")
    public ResponseEntity<?> getStudentHealthProfile(@PathVariable String maHocSinh) {
        try {
            HoSoSucKhoeDTO dto = studentHealthService.getOrCreateByMaHocSinh(maHocSinh);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ✅ Cập nhật hồ sơ sức khỏe học sinh
    @PutMapping("/{maHocSinh}")
    public ResponseEntity<?> updateHealthFromStudent(@PathVariable String maHocSinh, @RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            HoSoSucKhoeDTO dto = studentHealthService.updateByMaHocSinh(maHocSinh, hoSoData);
            return ResponseEntity.ok(Map.of("message", "✅ Cập nhật thành công", "data", dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
