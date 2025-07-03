package com.schoolhealth.controller;

import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.service.PhuHuynhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/phu-huynh")
@CrossOrigin(origins = "*")
public class PhuHuynhController {
    
    @Autowired
    private PhuHuynhService phuHuynhService;
    
    @GetMapping
    public List<PhuHuynh> getAllPhuHuynh() {
        return phuHuynhService.getAllPhuHuynh();
    }
    
    @GetMapping("/{maPhuHuynh}")
    public ResponseEntity<PhuHuynh> getPhuHuynhById(@PathVariable String maPhuHuynh) {
        Optional<PhuHuynh> phuHuynh = phuHuynhService.getPhuHuynhById(maPhuHuynh);
        return phuHuynh.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<PhuHuynh> getPhuHuynhByEmail(@PathVariable String email) {
        // Sử dụng method getPhuHuynhByEmail() đã thêm vào Service
        Optional<PhuHuynh> phuHuynh = phuHuynhService.getPhuHuynhByEmail(email);
        return phuHuynh.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public PhuHuynh createPhuHuynh(@RequestBody PhuHuynh phuHuynh) {
        return phuHuynhService.savePhuHuynh(phuHuynh);
    }
    
    @PutMapping("/{maPhuHuynh}")
    public ResponseEntity<PhuHuynh> updatePhuHuynh(@PathVariable String maPhuHuynh, @RequestBody PhuHuynh phuHuynhDetails) {
        PhuHuynh updatedPhuHuynh = phuHuynhService.updatePhuHuynh(maPhuHuynh, phuHuynhDetails);
        if (updatedPhuHuynh != null) {
            return ResponseEntity.ok(updatedPhuHuynh);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{maPhuHuynh}")
    public ResponseEntity<Void> deletePhuHuynh(@PathVariable String maPhuHuynh) {
        phuHuynhService.deletePhuHuynh(maPhuHuynh);
        return ResponseEntity.ok().build();
    }
}