package com.schoolhealth.service;

import java.util.Optional;

import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.entity.HoSoSucKhoeHocSinh; // ✅ Thêm dòng này

public interface StudentHealthService {
    HoSoSucKhoeDTO getOrCreateByMaHocSinh(String maHocSinh);
    HoSoSucKhoeDTO updateByMaHocSinh(String maHocSinh, HoSoSucKhoeHocSinh data);
    Optional<HoSoSucKhoeHocSinh> findByMaHocSinhSingle(String maHocSinh);
}
