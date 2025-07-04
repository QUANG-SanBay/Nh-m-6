package com.schoolhealth.repository;

import com.schoolhealth.entity.PhuHuynh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PhuHuynhRepository extends JpaRepository<PhuHuynh, String> {
    
    PhuHuynh findByEmail(String email);
    
    PhuHuynh findByTenDangNhap(String tenDangNhap);
    
    // Thêm query tùy chỉnh để debug
    @Query("SELECT p FROM PhuHuynh p WHERE p.tenDangNhap = :username")
    PhuHuynh findByTenDangNhapCustom(@Param("username") String username);
    
    @Query("SELECT p FROM PhuHuynh p WHERE p.hoTen = :hoTen")
    PhuHuynh findByHoTen(@Param("hoTen") String hoTen);
    
    boolean existsById(String maPhuHuynh);
}