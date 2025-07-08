package com.schoolhealth.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.dto.LichSuKhamBenhDTO;
import com.schoolhealth.service.LichSuKhamBenhService;

@RestController
@RequestMapping("/api/lichsu-khambenh")
@CrossOrigin(origins = "http://localhost:3000")
public class LichSuKhamBenhController {

    @Autowired
    private LichSuKhamBenhService lichSuService;

    @GetMapping("/{maHocSinh}")
    public ResponseEntity<List<LichSuKhamBenhDTO>> getLichSuByHocSinh(@PathVariable String maHocSinh) {
        return ResponseEntity.ok(lichSuService.getLichSuByHocSinh(maHocSinh));
    }

    @PostMapping
    public ResponseEntity<LichSuKhamBenhDTO> save(@RequestBody LichSuKhamBenhDTO dto) {
        return ResponseEntity.ok(lichSuService.saveLichSu(dto));
    }
}
