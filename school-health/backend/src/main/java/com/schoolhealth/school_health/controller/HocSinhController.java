package com.schoolhealth.school_health.controller;

import com.schoolhealth.school_health.entity.HocSinh;
import com.schoolhealth.school_health.service.HocSinhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hocsinh")
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
} 