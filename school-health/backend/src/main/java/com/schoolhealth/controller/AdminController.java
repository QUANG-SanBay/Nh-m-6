package com.schoolhealth.controller;

import com.schoolhealth.dto.NguoiDungThongKeDTO;
import com.schoolhealth.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public List<NguoiDungThongKeDTO> layTatCaNguoiDung() {
        return adminService.layTatCaTaiKhoan();
    }

    @DeleteMapping("/users/{tenDangNhap}")
    public ResponseEntity<?> deleteUser(
            @PathVariable String tenDangNhap,
            @RequestParam String role
    ) {
        try {
            adminService.xoaNguoiDungBangTenDangNhap(tenDangNhap, role);
            return ResponseEntity.ok("Xóa thành công");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Xóa thất bại: " + e.getMessage());
        }
    }
}