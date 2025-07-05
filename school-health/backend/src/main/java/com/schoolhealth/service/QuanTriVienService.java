package com.schoolhealth.service;

import com.schoolhealth.entity.QuanTriVien;
import com.schoolhealth.repository.QuanTriVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class QuanTriVienService {
    @Autowired
    private QuanTriVienRepository quanTriVienRepository;

    public QuanTriVien save(QuanTriVien quanTriVien) {
        // Luôn tạo ID mới khi save
        if (quanTriVien.getMaQuanTriVien() == null || quanTriVien.getMaQuanTriVien().trim().isEmpty()) {
            quanTriVien.setMaQuanTriVien("QT" + UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase());
        }
        return quanTriVienRepository.save(quanTriVien);
    }
}