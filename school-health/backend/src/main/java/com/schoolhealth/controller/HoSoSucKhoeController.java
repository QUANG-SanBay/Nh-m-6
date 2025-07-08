package com.schoolhealth.controller;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.service.HoSoSucKhoeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    
    @GetMapping("/hocsinh/{maHocSinh}/for-parent")
    public ResponseEntity<?> getHoSoByMaHocSinhForParent(@PathVariable String maHocSinh) {
        try {
            List<HoSoSucKhoeHocSinh> hoSoList = hoSoSucKhoeService.getHoSoByMaHocSinh(maHocSinh);
            List<HoSoSucKhoeDTO> hoSoDTOList = hoSoList.stream()
                .map(HoSoSucKhoeDTO::new)
                .collect(Collectors.toList());
            return ResponseEntity.ok(hoSoDTOList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}