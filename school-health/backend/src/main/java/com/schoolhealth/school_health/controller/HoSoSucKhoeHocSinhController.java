package com.schoolhealth.school_health.controller;

import com.schoolhealth.school_health.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.school_health.service.HoSoSucKhoeHocSinhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hoso-suckhoe")
public class HoSoSucKhoeHocSinhController {
    @Autowired
    private HoSoSucKhoeHocSinhService service;

    @GetMapping("/hocsinh/{maHocSinh}")
    public List<HoSoSucKhoeHocSinh> getByHocSinh(@PathVariable String maHocSinh) {
        return service.getByHocSinh(maHocSinh);
    }

    @GetMapping("/{id}")
    public Optional<HoSoSucKhoeHocSinh> getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PostMapping
    public HoSoSucKhoeHocSinh createOrUpdate(@RequestBody HoSoSucKhoeHocSinh hoSo) {
        return service.saveOrUpdate(hoSo);
    }
} 