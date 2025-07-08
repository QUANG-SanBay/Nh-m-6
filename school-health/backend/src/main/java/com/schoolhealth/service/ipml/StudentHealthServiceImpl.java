package com.schoolhealth.service.ipml;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.repository.HoSoSucKhoeRepository;
import com.schoolhealth.repository.HocSinhRepository;
import com.schoolhealth.service.StudentHealthService;

@Service
public class StudentHealthServiceImpl implements StudentHealthService {

    @Autowired
    private HoSoSucKhoeRepository hoSoSucKhoeRepository;

    @Autowired
    private HocSinhRepository hocSinhRepository;

    // ✅ Lấy hoặc tạo hồ sơ sức khỏe theo mã học sinh
    @Override
    public HoSoSucKhoeDTO getOrCreateByMaHocSinh(String maHocSinh) {
        Optional<HoSoSucKhoeHocSinh> existing = findByMaHocSinhSingle(maHocSinh);
        if (existing.isPresent()) {
            return new HoSoSucKhoeDTO(existing.get());
        }

        // Nếu chưa có, trả về hồ sơ rỗng từ thông tin học sinh
        Optional<HocSinh> hocSinh = hocSinhRepository.findById(maHocSinh);
        if (hocSinh.isPresent()) {
            return new HoSoSucKhoeDTO(hocSinh.get());
        } else {
            throw new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh);
        }
    }

    // ✅ Cập nhật hồ sơ sức khỏe từ học sinh
    @Override
    public HoSoSucKhoeDTO updateByMaHocSinh(String maHocSinh, HoSoSucKhoeHocSinh data) {
        HoSoSucKhoeHocSinh entity;

        Optional<HoSoSucKhoeHocSinh> existing = findByMaHocSinhSingle(maHocSinh);
        if (existing.isPresent()) {
            entity = existing.get();
        } else {
            entity = new HoSoSucKhoeHocSinh();
            entity.setMaHoSo(null); // Cho phép tự sinh
            entity.setHocSinh(hocSinhRepository.findById(maHocSinh)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy học sinh")));
        }

        // Gán dữ liệu
        entity.setDiUng(data.getDiUng());
        entity.setBenhManTinh(data.getBenhManTinh());
        entity.setTienSuDieuTri(data.getTienSuDieuTri());
        entity.setThiLuc(data.getThiLuc());
        entity.setThinhLuc(data.getThinhLuc());
        entity.setLichSuTiemChung(data.getLichSuTiemChung());
        entity.setGhiChu(data.getGhiChu());
        entity.setChieuCao(data.getChieuCao());
        entity.setCanNang(data.getCanNang());
        entity.setKetQuaRangMieng(data.getKetQuaRangMieng());
        entity.setNhomMau(data.getNhomMau());
        entity.setTinhTrangSucKhoe(data.getTinhTrangSucKhoe());
        entity.setAnhHocSinh(data.getAnhHocSinh());
        entity.setNgayCapNhatCuoi(new Date());

        // Lưu và trả về DTO
        HoSoSucKhoeHocSinh saved = hoSoSucKhoeRepository.save(entity);
        return new HoSoSucKhoeDTO(saved);
    }

    // ✅ Tìm bản ghi duy nhất gần nhất theo học sinh
    @Override
    public Optional<HoSoSucKhoeHocSinh> findByMaHocSinhSingle(String maHocSinh) {
        return hoSoSucKhoeRepository.findFirstByHocSinh_MaHocSinhOrderByNgayCapNhatCuoiDesc(maHocSinh);
    }
}
