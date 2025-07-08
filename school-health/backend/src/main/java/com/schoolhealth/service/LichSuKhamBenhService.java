package com.schoolhealth.service;

import java.util.List;

import com.schoolhealth.dto.LichSuKhamBenhDTO;

public interface LichSuKhamBenhService {
    List<LichSuKhamBenhDTO> getLichSuByHocSinh(String maHocSinh);
    LichSuKhamBenhDTO saveLichSu(LichSuKhamBenhDTO dto);
}
