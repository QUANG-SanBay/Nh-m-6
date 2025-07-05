package com.schoolhealth.repository;

import com.schoolhealth.entity.QuanLyNhaTruong;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuanLyNhaTruongRepository extends JpaRepository<QuanLyNhaTruong, String> {
    QuanLyNhaTruong findByTenDangNhap(String tenDangNhap);
    QuanLyNhaTruong findByEmail(String email);
}