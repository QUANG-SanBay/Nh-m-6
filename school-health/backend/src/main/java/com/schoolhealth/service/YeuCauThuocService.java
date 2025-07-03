package com.schoolhealth.service;

import com.schoolhealth.entity.YeuCauThuoc;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.entity.Thuoc;
import com.schoolhealth.repository.YeuCauThuocRepository;
import com.schoolhealth.repository.HocSinhRepository;
import com.schoolhealth.repository.PhuHuynhRepository;
import com.schoolhealth.repository.ThuocRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class YeuCauThuocService {
    
    @Autowired
    private YeuCauThuocRepository yeuCauThuocRepository;
    
    @Autowired
    private HocSinhRepository hocSinhRepository;
    
    @Autowired
    private PhuHuynhRepository phuHuynhRepository;
    
    @Autowired
    private ThuocRepository thuocRepository;
    
    public List<YeuCauThuoc> getYeuCauByPhuHuynh(String maPhuHuynh) {
        return yeuCauThuocRepository.findByPhuHuynh_MaPhuHuynh(maPhuHuynh);
    }
    
    public List<YeuCauThuoc> getYeuCauByHocSinh(String maHocSinh) {
        return yeuCauThuocRepository.findByHocSinh_MaHocSinh(maHocSinh);
    }
    
    public YeuCauThuoc createYeuCauThuoc(YeuCauThuoc yeuCauData) {
        try {
            // Validate input
            if (yeuCauData.getHocSinh() == null || yeuCauData.getHocSinh().getMaHocSinh() == null) {
                throw new RuntimeException("Mã học sinh không được để trống");
            }
            
            if (yeuCauData.getLieuLuong() == null || yeuCauData.getLieuLuong().trim().isEmpty()) {
                throw new RuntimeException("Liều lượng thuốc không được để trống");
            }
            
            // Find student
            Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(yeuCauData.getHocSinh().getMaHocSinh());
            if (!hocSinhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy học sinh");
            }
            
            HocSinh hocSinh = hocSinhOpt.get();
            
            // Get parent from student
            PhuHuynh phuHuynh = hocSinh.getPhuHuynh();
            if (phuHuynh == null) {
                throw new RuntimeException("Học sinh không có phụ huynh");
            }
            
            // Create new request
            YeuCauThuoc yeuCau = new YeuCauThuoc();
            yeuCau.setMaYeuCau(UUID.randomUUID().toString());
            yeuCau.setTenThuoc("Thuốc theo yêu cầu");
            yeuCau.setLieuLuong(yeuCauData.getLieuLuong());
            yeuCau.setDonVi("Theo chỉ định");
            yeuCau.setMoTa(yeuCauData.getMoTa());
            yeuCau.setLyDoSuDung("Yêu cầu từ phụ huynh");
            yeuCau.setTrangThai("CHO_DUYET");
            yeuCau.setGhiChu(yeuCauData.getGhiChu());
            yeuCau.setTinhTrangDacBiet(yeuCauData.getTinhTrangDacBiet());
            yeuCau.setNgayTao(new Date());
            yeuCau.setHocSinh(hocSinh);
            yeuCau.setPhuHuynh(phuHuynh);
            
            return yeuCauThuocRepository.save(yeuCau);
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi tạo yêu cầu thuốc: " + e.getMessage());
        }
    }
    
    public YeuCauThuoc updateYeuCauThuoc(String maYeuCau, YeuCauThuoc yeuCauData) {
        try {
            Optional<YeuCauThuoc> existingOpt = yeuCauThuocRepository.findById(maYeuCau);
            if (!existingOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy yêu cầu thuốc");
            }
            
            YeuCauThuoc existing = existingOpt.get();
            
            // Only allow updates if status is "CHO_DUYET"
            if (!"CHO_DUYET".equals(existing.getTrangThai())) {
                throw new RuntimeException("Không thể cập nhật yêu cầu đã được xử lý");
            }
            
            // Update fields
            if (yeuCauData.getLieuLuong() != null) {
                existing.setLieuLuong(yeuCauData.getLieuLuong());
            }
            if (yeuCauData.getMoTa() != null) {
                existing.setMoTa(yeuCauData.getMoTa());
            }
            if (yeuCauData.getGhiChu() != null) {
                existing.setGhiChu(yeuCauData.getGhiChu());
            }
            if (yeuCauData.getTinhTrangDacBiet() != null) {
                existing.setTinhTrangDacBiet(yeuCauData.getTinhTrangDacBiet());
            }
            
            existing.setNgayCapNhat(new Date());
            
            return yeuCauThuocRepository.save(existing);
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi cập nhật yêu cầu thuốc: " + e.getMessage());
        }
    }
    
    public void deleteYeuCauThuoc(String maYeuCau) {
        Optional<YeuCauThuoc> existingOpt = yeuCauThuocRepository.findById(maYeuCau);
        if (!existingOpt.isPresent()) {
            throw new RuntimeException("Không tìm thấy yêu cầu thuốc");
        }
        
        YeuCauThuoc existing = existingOpt.get();
        if (!"CHO_DUYET".equals(existing.getTrangThai())) {
            throw new RuntimeException("Không thể xóa yêu cầu đã được xử lý");
        }
        
        yeuCauThuocRepository.deleteById(maYeuCau);
    }
}
