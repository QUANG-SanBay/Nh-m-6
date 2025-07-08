package com.schoolhealth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.dto.HocSinhInfoDTO;
import com.schoolhealth.service.PhuHuynhHocSinhService;

@RestController
@RequestMapping("/api/phu-huynh-hoc-sinh")
@CrossOrigin(origins = "http://localhost:3000")
public class PhuHuynhHocSinhController {
    
    @Autowired
    private PhuHuynhHocSinhService phuHuynhHocSinhService;
    
    // Liên kết phụ huynh và học sinh
    @PostMapping("/link")
    public ResponseEntity<?> linkPhuHuynhToHocSinh(@RequestBody Map<String, String> request) {
        try {
            String maHocSinh = request.get("maHocSinh");
            String maPhuHuynh = request.get("maPhuHuynh");
            
            if (maHocSinh == null || maPhuHuynh == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Thiếu thông tin mã học sinh hoặc mã phụ huynh"));
            }
            
            HocSinh result = phuHuynhHocSinhService.linkPhuHuynhToHocSinh(maHocSinh, maPhuHuynh);
            return ResponseEntity.ok(Map.of(
                "message", "Liên kết thành công",
                "data", result
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Liên kết bằng email phụ huynh
    @PostMapping("/link-by-email")
    public ResponseEntity<?> linkByEmail(@RequestBody Map<String, String> request) {
        try {
            String maHocSinh = request.get("maHocSinh");
            String email = request.get("email");
            
            if (maHocSinh == null || email == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Thiếu thông tin mã học sinh hoặc email"));
            }
            
            // Tìm phụ huynh theo email
            PhuHuynh phuHuynh = phuHuynhHocSinhService.findPhuHuynhByEmail(email);
            if (phuHuynh == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy phụ huynh với email: " + email));
            }
            
            HocSinh result = phuHuynhHocSinhService.linkPhuHuynhToHocSinh(maHocSinh, phuHuynh.getMaPhuHuynh());
            return ResponseEntity.ok(Map.of(
                "message", "Liên kết thành công",
                "data", result
            ));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Lấy danh sách học sinh của phụ huynh
    @GetMapping("/phu-huynh/{maPhuHuynh}/hoc-sinh")
    public ResponseEntity<?> getHocSinhByPhuHuynh(@PathVariable String maPhuHuynh) {
        try {
            List<HocSinh> hocSinhList = phuHuynhHocSinhService.getHocSinhByPhuHuynh(maPhuHuynh);
            return ResponseEntity.ok(hocSinhList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Lấy danh sách học sinh với thông tin chi tiết của phụ huynh
    @GetMapping("/phu-huynh/{maPhuHuynh}/hoc-sinh-detail")
    public ResponseEntity<?> getHocSinhDetailByPhuHuynh(@PathVariable String maPhuHuynh) {
        try {
            List<HocSinhInfoDTO> hocSinhDetailList = phuHuynhHocSinhService.getHocSinhInfoByPhuHuynh(maPhuHuynh);
            return ResponseEntity.ok(Map.of(
                "message", "Lấy thông tin chi tiết học sinh thành công",
                "data", hocSinhDetailList,
                "count", hocSinhDetailList.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Hủy liên kết
    @DeleteMapping("/unlink/{maHocSinh}")
    public ResponseEntity<?> unlinkPhuHuynhFromHocSinh(@PathVariable String maHocSinh) {
        try {
            HocSinh result = phuHuynhHocSinhService.unlinkPhuHuynhFromHocSinh(maHocSinh);
            return ResponseEntity.ok(Map.of(
                "message", "Hủy liên kết thành công",
                "data", result
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Lấy thống kê học sinh của phụ huynh
    @GetMapping("/phu-huynh/{maPhuHuynh}/thong-ke")
    public ResponseEntity<?> getThongKeHocSinh(@PathVariable String maPhuHuynh) {
        try {
            List<HocSinh> hocSinhList = phuHuynhHocSinhService.getHocSinhByPhuHuynh(maPhuHuynh);
            
            // Thống kê cơ bản
            int totalStudents = hocSinhList.size();
            int studentsWithHealthRecords = (int) hocSinhList.stream()
                .mapToLong(hs -> hs.getHoSoSucKhoeList() != null ? hs.getHoSoSucKhoeList().size() : 0)
                .count();
            
            Map<String, Object> thongKe = Map.of(
                "tongSoHocSinh", totalStudents,
                "soHocSinhCoHoSo", studentsWithHealthRecords,
                "soHocSinhChuaCoHoSo", totalStudents - studentsWithHealthRecords,
                "danhSachHocSinh", hocSinhList
            );
            
            return ResponseEntity.ok(Map.of(
                "message", "Lấy thống kê thành công",
                "data", thongKe
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}