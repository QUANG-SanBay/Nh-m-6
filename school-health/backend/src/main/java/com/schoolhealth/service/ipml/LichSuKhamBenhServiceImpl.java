package com.schoolhealth.service.ipml;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.schoolhealth.dto.LichSuKhamBenhDTO;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.LichSuKhamBenh;
import com.schoolhealth.repository.HocSinhRepository;
import com.schoolhealth.repository.LichSuKhamBenhRepository;
import com.schoolhealth.service.LichSuKhamBenhService;

@Service
public class LichSuKhamBenhServiceImpl implements LichSuKhamBenhService {

    @Autowired
    private LichSuKhamBenhRepository lichSuRepo;

    @Autowired
    private HocSinhRepository hocSinhRepo;

    @Override
    public List<LichSuKhamBenhDTO> getLichSuByHocSinh(String maHocSinh) {
        return lichSuRepo.findByHocSinh_MaHocSinh(maHocSinh)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public LichSuKhamBenhDTO saveLichSu(LichSuKhamBenhDTO dto) {
        HocSinh hs = hocSinhRepo.findById(dto.getMaHocSinh()).orElseThrow();

        LichSuKhamBenh entity = new LichSuKhamBenh();
        entity.setHocSinh(hs);
        entity.setThoiGianKham(dto.getThoiGianKham());
        entity.setChanDoan(dto.getChanDoan());
        entity.setDieuTri(dto.getDieuTri());
        entity.setThuocDaDung(dto.getThuocDaDung());
        entity.setTenVaccine(dto.getTenVaccine());
        entity.setMoTaTiemChung(dto.getMoTaTiemChung());
        entity.setTrangThai(dto.getTrangThai());
        entity.setBienPhapXuLy(dto.getBienPhapXuLy());
        entity.setDiaDiem(dto.getDiaDiem());
        entity.setThongBaoPhuHuynh(dto.getThongBaoPhuHuynh());

        return convertToDTO(lichSuRepo.save(entity));
    }

    private LichSuKhamBenhDTO convertToDTO(LichSuKhamBenh ls) {
        LichSuKhamBenhDTO dto = new LichSuKhamBenhDTO();
        dto.setId(ls.getId());
        dto.setMaHocSinh(ls.getHocSinh().getMaHocSinh());
        dto.setThoiGianKham(ls.getThoiGianKham());
        dto.setChanDoan(ls.getChanDoan());
        dto.setDieuTri(ls.getDieuTri());
        dto.setThuocDaDung(ls.getThuocDaDung());
        dto.setTenVaccine(ls.getTenVaccine());
        dto.setMoTaTiemChung(ls.getMoTaTiemChung());
        dto.setTrangThai(ls.getTrangThai());
        dto.setBienPhapXuLy(ls.getBienPhapXuLy());
        dto.setDiaDiem(ls.getDiaDiem());
        dto.setThongBaoPhuHuynh(ls.getThongBaoPhuHuynh());
        return dto;
    }
}
