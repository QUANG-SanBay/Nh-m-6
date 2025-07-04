package com.schoolhealth.controller.nurse;

import com.schoolhealth.entity.NhanVienYTe;
import com.schoolhealth.repository.NhanVienYTeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nurse")
public class NhanVienYTeController {
    @Autowired
    private NhanVienYTeRepository nhanVienYTeRepository;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String username) {
        NhanVienYTe nurse = nhanVienYTeRepository.findByTenDangNhap(username);
        if (nurse == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(nurse);
    }
}
