package com.schoolhealth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.service.HoSoSucKhoeService;

@RestController
@RequestMapping("/api/hoso-suckhoe")
@CrossOrigin(origins = "http://localhost:3000")
public class HoSoSucKhoeController {
    
    @Autowired
    private HoSoSucKhoeService hoSoSucKhoeService;
    
    @GetMapping("/hocsinh/{maHocSinh}")
    public ResponseEntity<?> getHoSoByMaHocSinh(@PathVariable String maHocSinh) {
        try {
            List<HoSoSucKhoeHocSinh> hoSoList = hoSoSucKhoeService.getHoSoByMaHocSinh(maHocSinh);
            return ResponseEntity.ok(hoSoList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> updateHoSoSucKhoe(@RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            HoSoSucKhoeHocSinh updatedHoSo = hoSoSucKhoeService.updateHoSoSucKhoe(hoSoData);
            return ResponseEntity.ok(Map.of(
                "message", "Cập nhật hồ sơ sức khỏe thành công",
                "data", updatedHoSo
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{maHoSo}")
    public ResponseEntity<?> updateHoSoSucKhoeById(@PathVariable String maHoSo, @RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            hoSoData.setMaHoSo(maHoSo);
            HoSoSucKhoeHocSinh updatedHoSo = hoSoSucKhoeService.updateHoSoSucKhoe(hoSoData);
            return ResponseEntity.ok(Map.of(
                "message", "Cập nhật hồ sơ sức khỏe thành công",
                "data", updatedHoSo
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    @GetMapping("/by-date")
    public ResponseEntity<?> getHoSoByDate(@RequestParam(required = false) String date) {
        try {
            List<HoSoSucKhoeHocSinh> result = hoSoSucKhoeService.getHoSoByDate(date);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

}