package com.schoolhealth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.dto.ProfileStudentDTO;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.service.HocSinhService;

@CrossOrigin(origins = "http://localhost:3000") // Cho phép gọi từ React
@RestController
@RequestMapping("/api/profilestudent") // ✅ Route riêng, không trùng với HocSinhController
public class ProfileStudentController {

    @Autowired
    private HocSinhService hocSinhService;

    // ✅ GET: Lấy thông tin học sinh
    @GetMapping("/{id}")
    public ResponseEntity<HocSinh> getStudentProfile(@PathVariable String id) {
        System.out.println("📥 GET /profilestudent/" + id);
        return hocSinhService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ PUT: Cập nhật hồ sơ học sinh
 @PutMapping("/{id}")
public ResponseEntity<?> updateStudentProfile(@PathVariable String id, @RequestBody ProfileStudentDTO dto) {
    System.out.println("✏️ PUT /profilestudent/" + id);

    return hocSinhService.findById(id)
        .map(hocSinh -> {
            hocSinh.setHoTen(dto.getHoTen());
             hocSinh.setLop(dto.getLop());
            hocSinh.setGioiTinh(dto.getGioiTinh());
            hocSinh.setNgaySinh(dto.getNgaySinh());
            hocSinh.setDiaChi(dto.getDiaChi());
            hocSinh.setTenNguoiLienHe(dto.getTenNguoiLienHe());
            hocSinh.setSdtNguoiLienHe(dto.getSdtNguoiLienHe());

            HocSinh updated = hocSinhService.save(hocSinh);
            return ResponseEntity.ok(updated);
        })
        .orElse(ResponseEntity.notFound().build());
}
}