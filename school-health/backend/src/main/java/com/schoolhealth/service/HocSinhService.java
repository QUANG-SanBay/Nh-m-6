package com.schoolhealth.service;

import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.repository.HocSinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class HocSinhService {
    @Autowired
    private HocSinhRepository hocSinhRepository;

    private String generateStudentId() {
        Random random = new Random();
        String id;
        boolean exists;
        
        do {
            // Tạo 6 chữ số ngẫu nhiên
            StringBuilder sb = new StringBuilder("HS");
            for (int i = 0; i < 6; i++) {
                sb.append(random.nextInt(10)); // Chữ số từ 0-9
            }
            id = sb.toString();
            
            // Kiểm tra xem ID đã tồn tại chưa
            exists = hocSinhRepository.findById(id).isPresent();
        } while (exists); // Lặp lại nếu ID đã tồn tại
        
        return id;
    }
    public List<HocSinh> findAll() {
        return hocSinhRepository.findAll();
    }

    public Optional<HocSinh> findById(String id) {
        return hocSinhRepository.findById(id);
    }

    public HocSinh save(HocSinh hocSinh) {
        // Nếu là học sinh mới (chưa có mã), tạo mã mới
        if (hocSinh.getMaHocSinh() == null || hocSinh.getMaHocSinh().trim().isEmpty()) {
            String newId = generateStudentId();
            System.out.println("Generated new student ID: " + newId); // Log để debug
            hocSinh.setMaHocSinh(newId);
        }
        return hocSinhRepository.save(hocSinh);
    }

    public void deleteById(String id) {
        hocSinhRepository.deleteById(id);
    }
} 