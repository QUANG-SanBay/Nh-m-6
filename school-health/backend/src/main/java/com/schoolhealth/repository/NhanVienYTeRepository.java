package com.schoolhealth.repository;

import com.schoolhealth.entity.NhanVienYTe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NhanVienYTeRepository extends JpaRepository<NhanVienYTe, String> {
    NhanVienYTe findByTenDangNhap(String tenDangNhap);
    boolean existsById(String maNhanVienYTe);
    void deleteByTenDangNhap(String tenDangNhap);

}