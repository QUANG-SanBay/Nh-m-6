package com.schoolhealth.repository;

import com.schoolhealth.entity.YeuCauThuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface YeuCauThuocRepository extends JpaRepository<YeuCauThuoc, String> {
    List<YeuCauThuoc> findByPhuHuynh_MaPhuHuynh(String maPhuHuynh);
    List<YeuCauThuoc> findByHocSinh_MaHocSinh(String maHocSinh);
    List<YeuCauThuoc> findByTrangThai(String trangThai);
}
