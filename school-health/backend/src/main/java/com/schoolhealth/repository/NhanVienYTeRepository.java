package com.schoolhealth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schoolhealth.entity.NhanVienYTe;

@Repository
public interface NhanVienYTeRepository extends JpaRepository<NhanVienYTe, String> {
    NhanVienYTe findByTenDangNhap(String tenDangNhap);
    boolean existsById(String maNhanVienYTe);
    void deleteByTenDangNhap(String tenDangNhap);

}