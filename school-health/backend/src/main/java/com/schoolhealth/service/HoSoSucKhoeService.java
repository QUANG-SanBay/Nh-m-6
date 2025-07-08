package com.schoolhealth.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.repository.HoSoSucKhoeHocSinhRepository;
import com.schoolhealth.repository.HocSinhRepository;

@Service
@Transactional
public class HoSoSucKhoeService {

    @Autowired
    private HoSoSucKhoeHocSinhRepository hoSoSucKhoeRepository;

    @Autowired
    private HocSinhRepository hocSinhRepository;

    public List<HoSoSucKhoeHocSinh> getHoSoByMaHocSinh(String maHocSinh) {
        return hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(maHocSinh);
    }

    public List<HoSoSucKhoeHocSinh> getHoSoByDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) {
            return hoSoSucKhoeRepository.findAll();
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDate = sdf.parse(dateStr);
            return hoSoSucKhoeRepository.findByNgayCapNhatCuoi(parsedDate);
        } catch (ParseException e) {
            throw new RuntimeException("Định dạng ngày không hợp lệ (yyyy-MM-dd).");
        }
    }

    public HoSoSucKhoeHocSinh updateHoSoSucKhoeByStudentId(String maHocSinh, HoSoSucKhoeHocSinh hoSoData) {
        HocSinh hocSinh = hocSinhRepository.findById(maHocSinh)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh));

        List<HoSoSucKhoeHocSinh> existingHoSoList = hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(maHocSinh);
        HoSoSucKhoeHocSinh hoSoToUpdate;

        if (existingHoSoList.isEmpty()) {
            hoSoToUpdate = new HoSoSucKhoeHocSinh();
            hoSoToUpdate.setMaHoSo(UUID.randomUUID().toString());
            hoSoToUpdate.setHocSinh(hocSinh);
        } else {
            hoSoToUpdate = existingHoSoList.get(0);
        }

        // Cập nhật các trường
        hoSoToUpdate.setDiUng(hoSoData.getDiUng());
        hoSoToUpdate.setBenhManTinh(hoSoData.getBenhManTinh());
        hoSoToUpdate.setTienSuDieuTri(hoSoData.getTienSuDieuTri());
        hoSoToUpdate.setThiLuc(hoSoData.getThiLuc());
        hoSoToUpdate.setThinhLuc(hoSoData.getThinhLuc());
        hoSoToUpdate.setLichSuTiemChung(hoSoData.getLichSuTiemChung());
        hoSoToUpdate.setGhiChu(hoSoData.getGhiChu());
        hoSoToUpdate.setChieuCao(hoSoData.getChieuCao());
        hoSoToUpdate.setCanNang(hoSoData.getCanNang());
        hoSoToUpdate.setKetQuaRangMieng(hoSoData.getKetQuaRangMieng());
        hoSoToUpdate.setNhomMau(hoSoData.getNhomMau());
        hoSoToUpdate.setTinhTrangSucKhoe(hoSoData.getTinhTrangSucKhoe());
        hoSoToUpdate.setAnhHocSinh(hoSoData.getAnhHocSinh());
        hoSoToUpdate.setNgayCapNhatCuoi(new Date());

        return hoSoSucKhoeRepository.save(hoSoToUpdate);
    }

    public HoSoSucKhoeHocSinh createHoSoSucKhoeForStudent(String maHocSinh, HoSoSucKhoeHocSinh hoSoData) {
        HocSinh hocSinh = hocSinhRepository.findById(maHocSinh)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh));
        hoSoData.setHocSinh(hocSinh);
        hoSoData.setNgayCapNhatCuoi(new Date());
        return hoSoSucKhoeRepository.save(hoSoData);
    }
}

