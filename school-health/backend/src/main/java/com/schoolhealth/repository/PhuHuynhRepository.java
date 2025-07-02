package com.schoolhealth.repository;

import com.schoolhealth.entity.PhuHuynh;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PhuHuynhRepository extends JpaRepository<PhuHuynh, String> {
    Optional<PhuHuynh> findByTenDangNhap(String tenDangNhap);
    Optional<PhuHuynh> findByEmail(String email);
} 