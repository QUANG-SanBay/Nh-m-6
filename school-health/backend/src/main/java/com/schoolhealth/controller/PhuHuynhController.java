package com.schoolhealth.controller;

import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.service.PhuHuynhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/phu-huynh")
@CrossOrigin(origins = "http://localhost:3000")
public class PhuHuynhController {
    
    @Autowired
    private PhuHuynhService phuHuynhService;
    
    @GetMapping
    public ResponseEntity<List<PhuHuynh>> getAllPhuHuynh() {
        try {
            List<PhuHuynh> phuHuynhList = phuHuynhService.getAllPhuHuynh();
            return ResponseEntity.ok(phuHuynhList);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPhuHuynhById(@PathVariable String id) {
        try {
            Optional<PhuHuynh> phuHuynh = phuHuynhService.getPhuHuynhById(id);
            if (phuHuynh.isPresent()) {
                return ResponseEntity.ok(phuHuynh.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getPhuHuynhByEmail(@PathVariable String email) {
        try {
            Optional<PhuHuynh> phuHuynh = phuHuynhService.getPhuHuynhByEmail(email);
            if (phuHuynh.isPresent()) {
                return ResponseEntity.ok(phuHuynh.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/username/{username}")
    public ResponseEntity<?> getPhuHuynhByUsername(@PathVariable String username) {
        try {
            System.out.println("=== DEBUG: getPhuHuynhByUsername ===");
            System.out.println("Received username: " + username);
            
            Optional<PhuHuynh> phuHuynh = phuHuynhService.getPhuHuynhByUsername(username);
            
            if (phuHuynh.isPresent()) {
                System.out.println("Found parent: " + phuHuynh.get().getHoTen());
                return ResponseEntity.ok(phuHuynh.get());
            } else {
                System.out.println("Parent not found for username: " + username);
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error in getPhuHuynhByUsername: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createPhuHuynh(@RequestBody PhuHuynh phuHuynh) {
        try {
            PhuHuynh savedPhuHuynh = phuHuynhService.save(phuHuynh);
            return ResponseEntity.ok(Map.of(
                "message", "Tạo phụ huynh thành công",
                "data", savedPhuHuynh
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePhuHuynh(@PathVariable String id, @RequestBody PhuHuynh phuHuynhDetails) {
        try {
            // Validate input
            if (phuHuynhDetails.getHoTen() == null || phuHuynhDetails.getHoTen().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Họ tên không được để trống"));
            }
            
            if (phuHuynhDetails.getSoDienThoai() == null || phuHuynhDetails.getSoDienThoai().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Số điện thoại không được để trống"));
            }
            
            if (phuHuynhDetails.getEmail() == null || phuHuynhDetails.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Email không được để trống"));
            }
            
            // Validate email format
            if (!isValidEmail(phuHuynhDetails.getEmail())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Định dạng email không hợp lệ"));
            }
            
            // Validate phone number
            if (!isValidPhoneNumber(phuHuynhDetails.getSoDienThoai())) {
                return ResponseEntity.badRequest().body(Map.of("error", "Số điện thoại phải có 10-11 chữ số"));
            }
            
            PhuHuynh updatedPhuHuynh = phuHuynhService.updatePhuHuynh(id, phuHuynhDetails);
            if (updatedPhuHuynh != null) {
                return ResponseEntity.ok(Map.of(
                    "message", "Cập nhật thông tin thành công",
                    "data", updatedPhuHuynh
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePhuHuynh(@PathVariable String id) {
        try {
            phuHuynhService.deletePhuHuynh(id);
            return ResponseEntity.ok(Map.of("message", "Xóa phụ huynh thành công"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    // Validation methods
    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }
    
    private boolean isValidPhoneNumber(String phoneNumber) {
        String phoneRegex = "^[0-9]{10,11}$";
        return phoneNumber.matches(phoneRegex);
    }
}