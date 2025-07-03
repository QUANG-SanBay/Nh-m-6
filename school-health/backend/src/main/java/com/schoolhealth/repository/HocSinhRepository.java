package com.schoolhealth.repository;

import com.schoolhealth.entity.HocSinh;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HocSinhRepository extends JpaRepository<HocSinh, String> {
    HocSinh findByTenDangNhap(String tenDangNhap);
    List<HocSinh> findByPhuHuynh_MaPhuHuynh(String maPhuHuynh);
    List<HocSinh> findByPhuHuynhIsNull(); // Tìm học sinh chưa có phụ huynh
}