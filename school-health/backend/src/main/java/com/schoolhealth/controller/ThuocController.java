package com.schoolhealth.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.entity.Thuoc;
import com.schoolhealth.repository.ThuocRepository;

@RestController
@RequestMapping("/api/thuoc")
@CrossOrigin(origins = "*") // Thêm dòng này
public class ThuocController {
    @Autowired
    private ThuocRepository thuocRepository;

    @PostMapping
    public Thuoc createThuoc(@RequestBody Thuoc thuoc) {
        return thuocRepository.save(thuoc);
    }

    @GetMapping
    public List<Thuoc> getAllThuoc() {
        return thuocRepository.findAll();
    }

    @PutMapping("/{maThuoc}")
    public Thuoc updateThuoc(@PathVariable String maThuoc, @RequestBody Thuoc thuoc) {
        thuoc.setMaThuoc(maThuoc);
        return thuocRepository.save(thuoc);
    }

    @DeleteMapping("/{maThuoc}")
    public void deleteThuoc(@PathVariable String maThuoc) {
        thuocRepository.deleteById(maThuoc);
    }
}
