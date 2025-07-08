// Repository: LichSuKhamBenhRepository.java
package com.schoolhealth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.schoolhealth.entity.LichSuKhamBenh;

@Repository
public interface LichSuKhamBenhRepository extends JpaRepository<LichSuKhamBenh, Long> {
    
    // Trả về toàn bộ lịch sử khám bệnh theo mã học sinh
    List<LichSuKhamBenh> findByHocSinh_MaHocSinh(String maHocSinh);

    // Nếu sau này cần thêm sắp xếp theo thời gian
    List<LichSuKhamBenh> findByHocSinh_MaHocSinhOrderByThoiGianKhamDesc(String maHocSinh);
}
