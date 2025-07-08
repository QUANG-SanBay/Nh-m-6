package com.schoolhealth.controller;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.service.HoSoSucKhoeService;
import com.schoolhealth.service.HocSinhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hoso-suckhoe")
@CrossOrigin(origins = "http://localhost:3000")
public class HoSoSucKhoeController {
    
    @Autowired
    private HoSoSucKhoeService hoSoSucKhoeService;
    
    @Autowired
    private HocSinhService hocSinhService;
    
    @GetMapping("/hocsinh/{maHocSinh}")
    public ResponseEntity<?> getHoSoByMaHocSinh(@PathVariable String maHocSinh) {
        try {
            // Tìm học sinh trước
            Optional<HocSinh> hocSinhOpt = hocSinhService.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy học sinh"));
            }
            
            List<HoSoSucKhoeHocSinh> hoSoList = hoSoSucKhoeService.getHoSoByMaHocSinh(maHocSinh);
            
            if (hoSoList.isEmpty()) {
                // Nếu chưa có hồ sơ sức khỏe, trả về danh sách trống
                return ResponseEntity.ok(List.of());
            } else {
                return ResponseEntity.ok(hoSoList);
            }
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
            // Tìm học sinh trước
            Optional<HocSinh> hocSinhOpt = hocSinhService.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy học sinh"));
            }
            
            HocSinh hocSinh = hocSinhOpt.get();
            List<HoSoSucKhoeHocSinh> hoSoList = hoSoSucKhoeService.getHoSoByMaHocSinh(maHocSinh);
            
            if (hoSoList.isEmpty()) {
                // Nếu chưa có hồ sơ sức khỏe, tạo một DTO với thông tin học sinh cơ bản
                HoSoSucKhoeDTO emptyHealthRecord = new HoSoSucKhoeDTO(hocSinh);
                return ResponseEntity.ok(List.of(emptyHealthRecord));
            } else {
                // Nếu có hồ sơ sức khỏe, trả về danh sách DTO
                List<HoSoSucKhoeDTO> hoSoDTOList = hoSoList.stream()
                    .map(HoSoSucKhoeDTO::new)
                    .collect(Collectors.toList());
                return ResponseEntity.ok(hoSoDTOList);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/hocsinh/{maHocSinh}/create")
    public ResponseEntity<?> createHoSoSucKhoeForStudent(@PathVariable String maHocSinh, @RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            HoSoSucKhoeHocSinh createdHoSo = hoSoSucKhoeService.updateHoSoSucKhoeByStudentId(maHocSinh, hoSoData);
            return ResponseEntity.ok(Map.of(
                "message", "Tạo hồ sơ sức khỏe thành công",
                "data", new HoSoSucKhoeDTO(createdHoSo)
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/hocsinh/{maHocSinh}/update")
    public ResponseEntity<?> updateHoSoSucKhoeByStudentId(@PathVariable String maHocSinh, @RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            HoSoSucKhoeHocSinh updatedHoSo = hoSoSucKhoeService.updateHoSoSucKhoeByStudentId(maHocSinh, hoSoData);
            return ResponseEntity.ok(Map.of(
                "message", "Cập nhật hồ sơ sức khỏe thành công",
                "data", new HoSoSucKhoeDTO(updatedHoSo)
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}