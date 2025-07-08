package com.schoolhealth.repository;

import com.schoolhealth.entity.HocSinh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HocSinhRepository extends JpaRepository<HocSinh, String> {
    HocSinh findByTenDangNhap(String tenDangNhap);
    List<HocSinh> findByPhuHuynh_MaPhuHuynh(String maPhuHuynh);
    List<HocSinh> findByPhuHuynhIsNull(); // Tìm học sinh chưa có phụ huynh

    // Lấy học sinh với thông tin hồ sơ sức khỏe
    @Query("SELECT h FROM HocSinh h LEFT JOIN FETCH h.hoSoSucKhoeList WHERE h.phuHuynh.maPhuHuynh = :maPhuHuynh")
    List<HocSinh> findByPhuHuynhWithHealthRecords(@Param("maPhuHuynh") String maPhuHuynh);

    // Đếm số học sinh của phụ huynh
    @Query("SELECT COUNT(h) FROM HocSinh h WHERE h.phuHuynh.maPhuHuynh = :maPhuHuynh")
    Long countByPhuHuynh(@Param("maPhuHuynh") String maPhuHuynh);
    void deleteByTenDangNhap(String tenDangNhap);

}