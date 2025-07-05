package com.schoolhealth.repository;

import com.schoolhealth.entity.QuanTriVien;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuanTriVienRepository extends JpaRepository<QuanTriVien, String> {
    QuanTriVien findByTenDangNhap(String tenDangNhap);
    QuanTriVien findByEmail(String email);
}