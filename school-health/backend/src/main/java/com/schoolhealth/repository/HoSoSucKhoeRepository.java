package com.schoolhealth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;

public interface HoSoSucKhoeRepository extends JpaRepository<HoSoSucKhoeHocSinh, String> {

    // Trả về tất cả hồ sơ của học sinh (dùng cho admin, lịch sử, thống kê)
    List<HoSoSucKhoeHocSinh> findByHocSinh_MaHocSinh(String maHocSinh);

    // ✅ Trả về bản ghi mới nhất (dùng cho học sinh sửa)
 Optional<HoSoSucKhoeHocSinh> findFirstByHocSinh_MaHocSinhOrderByNgayCapNhatCuoiDesc(String maHocSinh);

    
}
