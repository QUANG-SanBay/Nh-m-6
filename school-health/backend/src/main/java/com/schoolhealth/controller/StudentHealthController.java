package com.schoolhealth.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.service.HoSoSucKhoeService;

@RestController
@RequestMapping("/api/student-health")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentHealthController {

    @Autowired
    private HoSoSucKhoeService hoSoSucKhoeService;

    @PutMapping("/hocsinh/{maHocSinh}/update")
    public ResponseEntity<?> updateHealthFromStudent(@PathVariable String maHocSinh, @RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            HoSoSucKhoeHocSinh updated = hoSoSucKhoeService.updateHoSoSucKhoeByStudentId(maHocSinh, hoSoData);
            return ResponseEntity.ok(Map.of(
                "message", "✅ Cập nhật từ học sinh thành công",
                "data", updated
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
