package com.schoolhealth.service;

import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.repository.HocSinhRepository;
import com.schoolhealth.repository.PhuHuynhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PhuHuynhHocSinhService {
    
    @Autowired
    private HocSinhRepository hocSinhRepository;
    
    @Autowired
    private PhuHuynhRepository phuHuynhRepository;
    
    // Liên kết phụ huynh với học sinh
    public HocSinh linkPhuHuynhToHocSinh(String maHocSinh, String maPhuHuynh) {
        try {
            // Tìm học sinh
            Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh);
            }
            
            // Tìm phụ huynh
            Optional<PhuHuynh> phuHuynhOpt = phuHuynhRepository.findById(maPhuHuynh);
            if (!phuHuynhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy phụ huynh với mã: " + maPhuHuynh);
            }
            
            HocSinh hocSinh = hocSinhOpt.get();
            PhuHuynh phuHuynh = phuHuynhOpt.get();
            
            // Liên kết
            hocSinh.setPhuHuynh(phuHuynh);
            
            return hocSinhRepository.save(hocSinh);
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi liên kết phụ huynh và học sinh: " + e.getMessage());
        }
    }
    
    // Lấy danh sách học sinh của phụ huynh
    public List<HocSinh> getHocSinhByPhuHuynh(String maPhuHuynh) {
        return hocSinhRepository.findByPhuHuynh_MaPhuHuynh(maPhuHuynh);
    }
    
    // Tìm phụ huynh theo email để liên kết
    public PhuHuynh findPhuHuynhByEmail(String email) {
        return phuHuynhRepository.findByEmail(email);
    }
    
    // Hủy liên kết
    public HocSinh unlinkPhuHuynhFromHocSinh(String maHocSinh) {
        try {
            Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh);
            }
            
            HocSinh hocSinh = hocSinhOpt.get();
            hocSinh.setPhuHuynh(null);
            
            return hocSinhRepository.save(hocSinh);
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi hủy liên kết: " + e.getMessage());
        }
    }
}