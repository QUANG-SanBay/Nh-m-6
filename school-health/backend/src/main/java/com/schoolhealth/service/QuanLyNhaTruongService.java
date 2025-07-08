package com.schoolhealth.service;

import com.schoolhealth.entity.QuanLyNhaTruong;
import com.schoolhealth.repository.QuanLyNhaTruongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import java.util.UUID;

@Service
public class QuanLyNhaTruongService {

    @Autowired
    private QuanLyNhaTruongRepository quanLyNhaTruongRepository;

    public QuanLyNhaTruong save(QuanLyNhaTruong quanLyNhaTruong) {
        // Luôn tạo ID mới khi save
        if (quanLyNhaTruong.getMaQuanLy() == null || quanLyNhaTruong.getMaQuanLy().trim().isEmpty()) {
            quanLyNhaTruong.setMaQuanLy("QL" + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase());
        }
        return quanLyNhaTruongRepository.save(quanLyNhaTruong);
    }

    public List<QuanLyNhaTruong> findAll() {
    return quanLyNhaTruongRepository.findAll();
    }

    public Optional<QuanLyNhaTruong> findById(String id) {
        return quanLyNhaTruongRepository.findById(id);
    }

    public void deleteById(String id) {
        quanLyNhaTruongRepository.deleteById(id);
    }
}
