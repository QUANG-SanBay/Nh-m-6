package com.schoolhealth.controller;

import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.service.HocSinhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/hocsinh")
@CrossOrigin(origins = "http://localhost:3000")
public class HocSinhController {
    @Autowired
    private HocSinhService hocSinhService;

    @GetMapping
    public List<HocSinh> getAll() {
        return hocSinhService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<HocSinh> getById(@PathVariable String id) {
        return hocSinhService.findById(id);
    }

    @PostMapping
    public HocSinh create(@RequestBody HocSinh hocSinh) {
        hocSinh.setMaHocSinh(null);
        return hocSinhService.save(hocSinh);
    }

    @PutMapping("/{id}")
    public HocSinh update(@PathVariable String id, @RequestBody HocSinh hocSinh) {
        hocSinh.setMaHocSinh(id);
        return hocSinhService.save(hocSinh);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        hocSinhService.deleteById(id);
    }

    @GetMapping("/with-health-records")
    public ResponseEntity<?> getAllStudentsWithHealthRecords() {
        try {
            List<HocSinh> students = hocSinhService.findAll();
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}