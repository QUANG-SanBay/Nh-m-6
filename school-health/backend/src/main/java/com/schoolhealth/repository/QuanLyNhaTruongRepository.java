package com.schoolhealth.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schoolhealth.entity.QuanLyNhaTruong;
@Repository
public interface QuanLyNhaTruongRepository extends JpaRepository<QuanLyNhaTruong, String> {
    QuanLyNhaTruong findByTenDangNhap(String tenDangNhap);
    boolean existsById(String maQuanLyNhaTruong);
}