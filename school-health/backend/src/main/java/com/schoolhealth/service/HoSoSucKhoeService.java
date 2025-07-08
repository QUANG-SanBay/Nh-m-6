package com.schoolhealth.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.repository.HoSoSucKhoeHocSinhRepository;
import com.schoolhealth.repository.HocSinhRepository;

@Service
@Transactional
public class HoSoSucKhoeService {

    @Autowired
    private HoSoSucKhoeHocSinhRepository hoSoSucKhoeRepository;

    @Autowired
    private HocSinhRepository hocSinhRepository;

    public HoSoSucKhoeHocSinh save(HoSoSucKhoeHocSinh hoSo) {
        if (hoSo.getMaHoSo() == null || hoSo.getMaHoSo().isEmpty()) {
            hoSo.setMaHoSo(UUID.randomUUID().toString());
        }
        if (hoSo.getNgayCapNhatCuoi() == null) {
            hoSo.setNgayCapNhatCuoi(new Date());
        }
        return hoSoSucKhoeRepository.save(hoSo);
    }

    public List<HoSoSucKhoeHocSinh> getHoSoByMaHocSinh(String maHocSinh) {
        return hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(maHocSinh);
    }

    public List<HoSoSucKhoeHocSinh> getHoSoByPhuHuynh(String maPhuHuynh) {
        return hoSoSucKhoeRepository.findByHocSinh_PhuHuynh_MaPhuHuynh(maPhuHuynh);
    }

    public boolean checkAccessPermission(String maHocSinh, String maPhuHuynh) {
        Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(maHocSinh);
        return hocSinhOpt.map(hs -> {
            PhuHuynh ph = hs.getPhuHuynh();
            return ph != null && ph.getMaPhuHuynh().equals(maPhuHuynh);
        }).orElse(false);
    }

    public HoSoSucKhoeDTO getOrCreateHealthProfile(String maHocSinh) {
        HocSinh hocSinh = hocSinhRepository.findById(maHocSinh)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy học sinh"));

        List<HoSoSucKhoeHocSinh> list = hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(maHocSinh);

        HoSoSucKhoeHocSinh entity = list.isEmpty() ? new HoSoSucKhoeHocSinh() : list.get(0);

        if (list.isEmpty()) {
            entity.setHocSinh(hocSinh);
            entity.setMaHoSo(UUID.randomUUID().toString());
            entity.setNgayCapNhatCuoi(new Date());
            hoSoSucKhoeRepository.save(entity); // Lưu nếu là mới
        }

        return convertToDTO(entity);
    }

    public HoSoSucKhoeDTO updateFromStudent(HoSoSucKhoeDTO dto) {
        List<HoSoSucKhoeHocSinh> list = hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(dto.getMaHocSinh());

        HoSoSucKhoeHocSinh entity = list.isEmpty() ? new HoSoSucKhoeHocSinh() : list.get(0);

        HocSinh hocSinh = hocSinhRepository.findById(dto.getMaHocSinh())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy học sinh"));

        if (list.isEmpty()) {
            entity.setHocSinh(hocSinh);
            entity.setMaHoSo(UUID.randomUUID().toString());
        }

        entity.setHocSinh(hocSinh);
        entity.setChieuCao(dto.getChieuCao());
        entity.setCanNang(dto.getCanNang());
        entity.setNhomMau(dto.getNhomMau());
        entity.setThiLuc(dto.getThiLuc());
        entity.setThinhLuc(dto.getThinhLuc());
        entity.setTienSuDieuTri(dto.getTienSuDieuTri());
        entity.setBenhManTinh(dto.getBenhManTinh());
        entity.setDiUng(dto.getDiUng());
        entity.setKetQuaRangMieng(dto.getKetQuaRangMieng());
        entity.setGhiChu(dto.getGhiChu());
        entity.setAnhHocSinh(dto.getAnhHocSinh());
        entity.setNgayCapNhatCuoi(new Date());

        hoSoSucKhoeRepository.save(entity);
        return convertToDTO(entity);
    }

    private HoSoSucKhoeDTO convertToDTO(HoSoSucKhoeHocSinh entity) {
        HoSoSucKhoeDTO dto = new HoSoSucKhoeDTO();
        dto.setMaHoSo(UUID.fromString(entity.getMaHoSo()));
        dto.setMaHocSinh(entity.getHocSinh().getMaHocSinh());
        dto.setChieuCao(entity.getChieuCao());
        dto.setCanNang(entity.getCanNang());
        dto.setNhomMau(entity.getNhomMau());
        dto.setThiLuc(entity.getThiLuc());
        dto.setThinhLuc(entity.getThinhLuc());
        dto.setTienSuDieuTri(entity.getTienSuDieuTri());
        dto.setBenhManTinh(entity.getBenhManTinh());
        dto.setDiUng(entity.getDiUng());
        dto.setKetQuaRangMieng(entity.getKetQuaRangMieng());
        dto.setGhiChu(entity.getGhiChu());
        dto.setAnhHocSinh(entity.getAnhHocSinh());
        return dto;
    }
}
