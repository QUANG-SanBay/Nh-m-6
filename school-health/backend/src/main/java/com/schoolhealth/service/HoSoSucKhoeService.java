package com.schoolhealth.service;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.repository.HoSoSucKhoeHocSinhRepository;
import com.schoolhealth.repository.HocSinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class HoSoSucKhoeService {
    
    @Autowired
    private HoSoSucKhoeHocSinhRepository hoSoSucKhoeRepository;
    
    @Autowired
    private HocSinhRepository hocSinhRepository;
    
    // Lấy hồ sơ theo mã học sinh
    public List<HoSoSucKhoeHocSinh> getHoSoByMaHocSinh(String maHocSinh) {
        return hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(maHocSinh);
    }
    
    // Lấy hồ sơ theo phụ huynh (tất cả học sinh của phụ huynh đó)
    public List<HoSoSucKhoeHocSinh> getHoSoByPhuHuynh(String maPhuHuynh) {
        return hoSoSucKhoeRepository.findByHocSinh_PhuHuynh_MaPhuHuynh(maPhuHuynh);
    }
    
    // Kiểm tra quyền truy cập (phụ huynh chỉ có thể truy cập hồ sơ con mình)
    public boolean checkAccessPermission(String maHocSinh, String maPhuHuynh) {
        Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(maHocSinh);
        if (!hocSinhOpt.isPresent()) {
            return false;
        }
        
        HocSinh hocSinh = hocSinhOpt.get();
        PhuHuynh phuHuynh = hocSinh.getPhuHuynh();
        
        return phuHuynh != null && phuHuynh.getMaPhuHuynh().equals(maPhuHuynh);
    }
    
    public HoSoSucKhoeHocSinh updateHoSoSucKhoe(HoSoSucKhoeHocSinh hoSoData) {
        try {
            // Validate ảnh base64
            if (hoSoData.getAnhHocSinh() != null && !hoSoData.getAnhHocSinh().isEmpty()) {
                if (hoSoData.getAnhHocSinh().length() > 2000000) { // Tăng lên 2MB cho base64
                    throw new RuntimeException("Ảnh quá lớn. Vui lòng chọn ảnh có kích thước nhỏ hơn.");
                }
                
                // Validate format base64
                if (!hoSoData.getAnhHocSinh().startsWith("data:image/")) {
                    throw new RuntimeException("Định dạng ảnh không hợp lệ.");
                }
            }
            
            HocSinh hocSinh = null;
            
            // Tìm học sinh theo mã từ hồ sơ hiện có hoặc từ dữ liệu mới
            if (hoSoData.getMaHoSo() != null) {
                // Cập nhật hồ sơ hiện có
                Optional<HoSoSucKhoeHocSinh> existingHoSoOpt = hoSoSucKhoeRepository.findById(hoSoData.getMaHoSo());
                if (existingHoSoOpt.isPresent() && existingHoSoOpt.get().getHocSinh() != null) {
                    hocSinh = existingHoSoOpt.get().getHocSinh();
                }
            }
            
            // Nếu chưa tìm được học sinh từ hồ sơ hiện có, thử tìm từ dữ liệu truyền vào
            if (hocSinh == null && hoSoData.getHocSinh() != null && hoSoData.getHocSinh().getMaHocSinh() != null) {
                // Tạo mới từ dữ liệu học sinh
                Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(hoSoData.getHocSinh().getMaHocSinh());
                if (hocSinhOpt.isPresent()) {
                    hocSinh = hocSinhOpt.get();
                }
            }
            
            if (hocSinh == null) {
                throw new RuntimeException("Không tìm thấy thông tin học sinh để cập nhật hồ sơ sức khỏe");
            }
            
            // Cập nhật thông tin học sinh nếu có thay đổi
            if (hoSoData.getHocSinh() != null) {
                if (hoSoData.getHocSinh().getHoTen() != null) {
                    hocSinh.setHoTen(hoSoData.getHocSinh().getHoTen());
                }
                if (hoSoData.getHocSinh().getNgaySinh() != null) {
                    hocSinh.setNgaySinh(hoSoData.getHocSinh().getNgaySinh());
                }
                if (hoSoData.getHocSinh().getGioiTinh() != null) {
                    hocSinh.setGioiTinh(hoSoData.getHocSinh().getGioiTinh());
                }
                if (hoSoData.getHocSinh().getLop() != null) {
                    hocSinh.setLop(hoSoData.getHocSinh().getLop());
                }
                if (hoSoData.getHocSinh().getDiaChi() != null) {
                    hocSinh.setDiaChi(hoSoData.getHocSinh().getDiaChi());
                }
                
                // Lưu thông tin học sinh đã cập nhật
                hocSinhRepository.save(hocSinh);
            }
            
            // Tìm hồ sơ sức khỏe hiện có hoặc tạo mới
            List<HoSoSucKhoeHocSinh> existingHoSoList = hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(hocSinh.getMaHocSinh());
            HoSoSucKhoeHocSinh hoSo;
            
            if (existingHoSoList.isEmpty()) {
                // Tạo hồ sơ mới
                hoSo = new HoSoSucKhoeHocSinh();
                hoSo.setMaHoSo(UUID.randomUUID().toString());
                hoSo.setHocSinh(hocSinh);
            } else {
                // Cập nhật hồ sơ hiện có (lấy hồ sơ đầu tiên)
                hoSo = existingHoSoList.get(0);
            }
            
            // Cập nhật thông tin sức khỏe
            if (hoSoData.getDiUng() != null) {
                hoSo.setDiUng(hoSoData.getDiUng());
            }
            if (hoSoData.getBenhManTinh() != null) {
                hoSo.setBenhManTinh(hoSoData.getBenhManTinh());
            }
            if (hoSoData.getTienSuDieuTri() != null) {
                hoSo.setTienSuDieuTri(hoSoData.getTienSuDieuTri());
            }
            if (hoSoData.getThiLuc() != null) {
                hoSo.setThiLuc(hoSoData.getThiLuc());
            }
            if (hoSoData.getThinhLuc() != null) {
                hoSo.setThinhLuc(hoSoData.getThinhLuc());
            }
            if (hoSoData.getChieuCao() > 0) {
                hoSo.setChieuCao(hoSoData.getChieuCao());
            }
            if (hoSoData.getCanNang() > 0) {
                hoSo.setCanNang(hoSoData.getCanNang());
            }
            if (hoSoData.getKetQuaRangMieng() != null) {
                hoSo.setKetQuaRangMieng(hoSoData.getKetQuaRangMieng());
            }
            if (hoSoData.getGhiChu() != null) {
                hoSo.setGhiChu(hoSoData.getGhiChu());
            }
            if (hoSoData.getAnhHocSinh() != null && !hoSoData.getAnhHocSinh().isEmpty()) {
                hoSo.setAnhHocSinh(hoSoData.getAnhHocSinh());
            }
            
            // Cập nhật ngày cập nhật cuối
            hoSo.setNgayCapNhatCuoi(new Date());
            
            // Lưu hồ sơ sức khỏe
            return hoSoSucKhoeRepository.save(hoSo);
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi cập nhật hồ sơ sức khỏe: " + e.getMessage());
        }  
    }
    
    // Method mới để cập nhật hồ sơ sức khỏe với mã học sinh cụ thể
    public HoSoSucKhoeHocSinh updateHoSoSucKhoeByStudentId(String maHocSinh, HoSoSucKhoeHocSinh hoSoData) {
        try {
            // Tìm học sinh
            Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh);
            }
            
            HocSinh hocSinh = hocSinhOpt.get();
            
            // Tìm hồ sơ sức khỏe hiện có
            List<HoSoSucKhoeHocSinh> existingHoSoList = hoSoSucKhoeRepository.findByHocSinh_MaHocSinh(maHocSinh);
            HoSoSucKhoeHocSinh hoSo;
            
            if (existingHoSoList.isEmpty()) {
                // Tạo hồ sơ mới
                hoSo = new HoSoSucKhoeHocSinh();
                hoSo.setMaHoSo(UUID.randomUUID().toString());
                hoSo.setHocSinh(hocSinh);
            } else {
                // Cập nhật hồ sơ hiện có
                hoSo = existingHoSoList.get(0);
            }
            
            // Cập nhật các trường dữ liệu
            if (hoSoData.getDiUng() != null) hoSo.setDiUng(hoSoData.getDiUng());
            if (hoSoData.getBenhManTinh() != null) hoSo.setBenhManTinh(hoSoData.getBenhManTinh());
            if (hoSoData.getTienSuDieuTri() != null) hoSo.setTienSuDieuTri(hoSoData.getTienSuDieuTri());
            if (hoSoData.getThiLuc() != null) hoSo.setThiLuc(hoSoData.getThiLuc());
            if (hoSoData.getThinhLuc() != null) hoSo.setThinhLuc(hoSoData.getThinhLuc());
            if (hoSoData.getLichSuTiemChung() != null) hoSo.setLichSuTiemChung(hoSoData.getLichSuTiemChung());
            if (hoSoData.getGhiChu() != null) hoSo.setGhiChu(hoSoData.getGhiChu());
            if (hoSoData.getChieuCao() > 0) hoSo.setChieuCao(hoSoData.getChieuCao());
            if (hoSoData.getCanNang() > 0) hoSo.setCanNang(hoSoData.getCanNang());
            if (hoSoData.getKetQuaRangMieng() != null) hoSo.setKetQuaRangMieng(hoSoData.getKetQuaRangMieng());
            if (hoSoData.getNhomMau() != null) hoSo.setNhomMau(hoSoData.getNhomMau());
            if (hoSoData.getTinhTrangSucKhoe() != null) hoSo.setTinhTrangSucKhoe(hoSoData.getTinhTrangSucKhoe());
            if (hoSoData.getAnhHocSinh() != null) hoSo.setAnhHocSinh(hoSoData.getAnhHocSinh());
            
            // Cập nhật ngày cập nhật cuối
            hoSo.setNgayCapNhatCuoi(new Date());
            
            return hoSoSucKhoeRepository.save(hoSo);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi cập nhật hồ sơ sức khỏe: " + e.getMessage(), e);
        }
    }
}