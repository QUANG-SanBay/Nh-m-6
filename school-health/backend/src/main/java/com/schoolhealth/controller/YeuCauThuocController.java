package com.schoolhealth.controller;

import com.schoolhealth.entity.YeuCauThuoc;
import com.schoolhealth.entity.Thuoc;
import com.schoolhealth.service.YeuCauThuocService;
import com.schoolhealth.repository.ThuocRepository;
import com.schoolhealth.dto.YeuCauNhanThuocResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/yeu-cau-thuoc")
@CrossOrigin(origins = "http://localhost:3000")
public class YeuCauThuocController {
    
    @Autowired
    private YeuCauThuocService yeuCauThuocService;
    
    @Autowired
    private ThuocRepository thuocRepository;
    
    @GetMapping("/phu-huynh/{maPhuHuynh}")
    public ResponseEntity<?> getYeuCauByPhuHuynh(@PathVariable String maPhuHuynh) {
        try {
            List<YeuCauThuoc> yeuCauList = yeuCauThuocService.getYeuCauByPhuHuynh(maPhuHuynh);
            return ResponseEntity.ok(yeuCauList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/hoc-sinh/{maHocSinh}")
    public ResponseEntity<?> getYeuCauByHocSinh(@PathVariable String maHocSinh) {
        try {
            List<YeuCauThuoc> yeuCauList = yeuCauThuocService.getYeuCauByHocSinh(maHocSinh);
            return ResponseEntity.ok(yeuCauList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createYeuCauThuoc(@RequestBody YeuCauThuoc yeuCauData) {
        try {
            YeuCauThuoc createdYeuCau = yeuCauThuocService.createYeuCauThuoc(yeuCauData);
            return ResponseEntity.ok(Map.of(
                "message", "Tạo yêu cầu thuốc thành công",
                "data", createdYeuCau
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{maYeuCau}")
    public ResponseEntity<?> updateYeuCauThuoc(@PathVariable String maYeuCau, @RequestBody YeuCauThuoc yeuCauData) {
        try {
            YeuCauThuoc updatedYeuCau = yeuCauThuocService.updateYeuCauThuoc(maYeuCau, yeuCauData);
            return ResponseEntity.ok(Map.of(
                "message", "Cập nhật yêu cầu thuốc thành công",
                "data", updatedYeuCau
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{maYeuCau}")
    public ResponseEntity<?> deleteYeuCauThuoc(@PathVariable String maYeuCau) {
        try {
            yeuCauThuocService.deleteYeuCauThuoc(maYeuCau);
            return ResponseEntity.ok(Map.of("message", "Xóa yêu cầu thuốc thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/thuoc/search")
    public ResponseEntity<?> searchThuoc(@RequestParam String keyword) {
        try {
            List<Thuoc> thuocList = thuocRepository.findByTenContainingIgnoreCase(keyword);
            return ResponseEntity.ok(thuocList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/thuoc")
    public ResponseEntity<?> getAllThuoc() {
        try {
            List<Thuoc> thuocList = thuocRepository.findAll();
            return ResponseEntity.ok(thuocList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<?> getAllYeuCauThuoc() {
        List<YeuCauThuoc> list = yeuCauThuocService.getAllYeuCauThuoc();
        List<YeuCauNhanThuocResponse> result = list.stream().map(yeuCau -> {
            YeuCauNhanThuocResponse dto = new YeuCauNhanThuocResponse();
            dto.setMaYeuCau(yeuCau.getMaYeuCau());
            dto.setTenThuoc(yeuCau.getTenThuoc());
            dto.setLieuLuong(yeuCau.getLieuLuong());
            dto.setDonVi(yeuCau.getDonVi());
            dto.setMoTa(yeuCau.getMoTa());
            dto.setTrangThai(yeuCau.getTrangThai());
            dto.setNgayTao(yeuCau.getNgayTao());
            dto.setGhiChu(yeuCau.getGhiChu());
            dto.setTinhTrangDacBiet(yeuCau.getTinhTrangDacBiet());
            if (yeuCau.getHocSinh() != null) {
                dto.setHoTenHocSinh(yeuCau.getHocSinh().getHoTen());
                dto.setLopHocSinh(yeuCau.getHocSinh().getLop());
            } else {
                dto.setHoTenHocSinh(null);
                dto.setLopHocSinh(null);
            }
            return dto;
        }).toList();
        return ResponseEntity.ok(result);
    }
}
