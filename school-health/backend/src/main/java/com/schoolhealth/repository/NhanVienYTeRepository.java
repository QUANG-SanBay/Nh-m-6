package com.schoolhealth.repository;

import com.schoolhealth.entity.NhanVienYTe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NhanVienYTeRepository extends JpaRepository<NhanVienYTe, String> {
    NhanVienYTe findByTenDangNhap(String tenDangNhap);
} 