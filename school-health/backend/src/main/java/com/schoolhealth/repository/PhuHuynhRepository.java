package com.schoolhealth.repository;

import com.schoolhealth.entity.PhuHuynh;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhuHuynhRepository extends JpaRepository<PhuHuynh, String> {
    PhuHuynh findByTenDangNhap(String tenDangNhap);
} 