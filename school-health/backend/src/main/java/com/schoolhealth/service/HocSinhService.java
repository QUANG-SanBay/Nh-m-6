package com.schoolhealth.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.repository.HocSinhRepository;

@Service
public class HocSinhService {

    @Autowired
    private HocSinhRepository hocSinhRepository;

    // ✅ Hàm công khai để sinh mã học sinh duy nhất, dùng trong AuthService
    public String generateMaHocSinh() {
        return generateStudentId();
    }

    // 🔒 Hàm sinh mã học sinh bắt đầu bằng HS + 6 số ngẫu nhiên
    private String generateStudentId() {
        Random random = new Random();
        String id;
        boolean exists;

        do {
            StringBuilder sb = new StringBuilder("HS");
            for (int i = 0; i < 6; i++) {
                sb.append(random.nextInt(10)); // Tạo số từ 0-9
            }
            id = sb.toString();

            // Kiểm tra trùng mã học sinh
            exists = hocSinhRepository.existsById(id);
        } while (exists);

        return id;
    }

    // ✅ Lưu học sinh mới hoặc cập nhật nếu đã có
    public HocSinh save(HocSinh hocSinh) {
        if (hocSinh.getMaHocSinh() == null || hocSinh.getMaHocSinh().trim().isEmpty()) {
            String newId = generateStudentId();
            hocSinh.setMaHocSinh(newId);
            System.out.println("Generated new student ID: " + newId);
        }
        return hocSinhRepository.save(hocSinh);
    }

    // ✅ Truy vấn học sinh theo mã
    public Optional<HocSinh> findById(String id) {
        return hocSinhRepository.findById(id);
    }

    // ✅ Trả về toàn bộ danh sách học sinh
    public List<HocSinh> findAll() {
        return hocSinhRepository.findAll();
    }

    // ✅ Xóa học sinh theo mã
    public void deleteById(String id) {
        hocSinhRepository.deleteById(id);
    }
}
