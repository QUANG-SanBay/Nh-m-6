package com.schoolhealth.repository;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HoSoSucKhoeHocSinhRepository extends JpaRepository<HoSoSucKhoeHocSinh, String> {
    List<HoSoSucKhoeHocSinh> findByHocSinh_MaHocSinh(String maHocSinh);
} 