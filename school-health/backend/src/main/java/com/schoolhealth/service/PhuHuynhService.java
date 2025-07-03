package com.schoolhealth.service;

import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.repository.PhuHuynhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PhuHuynhService {
    
    @Autowired
    private PhuHuynhRepository phuHuynhRepository;
    
    public List<PhuHuynh> getAllPhuHuynh() {
        return phuHuynhRepository.findAll();
    }
    
    public Optional<PhuHuynh> getPhuHuynhById(String maPhuHuynh) {
        return phuHuynhRepository.findById(maPhuHuynh);
    }
    
    // Thêm method này để tương thích với Controller
    public Optional<PhuHuynh> getPhuHuynhByEmail(String email) {
        PhuHuynh phuHuynh = phuHuynhRepository.findByEmail(email);
        return Optional.ofNullable(phuHuynh);
    }
    
    public PhuHuynh findByEmail(String email) {
        return phuHuynhRepository.findByEmail(email);
    }
    
    public PhuHuynh savePhuHuynh(PhuHuynh phuHuynh) {
        return phuHuynhRepository.save(phuHuynh);
    }
    
    // Cập nhật phương thức save với xử lý ID an toàn
    public PhuHuynh save(PhuHuynh phuHuynh) {
        // Kiểm tra xem có phải là đối tượng mới hay không
        if (phuHuynh.getMaPhuHuynh() == null || phuHuynh.getMaPhuHuynh().trim().isEmpty()) {
            // Sinh mã phụ huynh tự động với thread-safe
            String maPhuHuynh = generateMaPhuHuynhSafe();
            phuHuynh.setMaPhuHuynh(maPhuHuynh);
        }
        
        // Kiểm tra xem ID đã tồn tại chưa
        Optional<PhuHuynh> existing = phuHuynhRepository.findById(phuHuynh.getMaPhuHuynh());
        if (existing.isPresent()) {
            // Nếu đã tồn tại, tạo ID mới
            String newId = generateMaPhuHuynhSafe();
            phuHuynh.setMaPhuHuynh(newId);
        }
        
        return phuHuynhRepository.save(phuHuynh);
    }
    
    // Phương thức sinh mã an toàn với thread
    private synchronized String generateMaPhuHuynhSafe() {
        String maPhuHuynh;
        int attempts = 0;
        
        do {
            // Lấy số thứ tự tiếp theo
            long count = phuHuynhRepository.count() + 1 + attempts;
            maPhuHuynh = String.format("PH%06d", count);
            attempts++;
        } while (phuHuynhRepository.existsById(maPhuHuynh) && attempts < 100);
        
        if (attempts >= 100) {
            // Fallback với timestamp nếu không tìm được ID duy nhất
            maPhuHuynh = "PH" + System.currentTimeMillis();
        }
        
        return maPhuHuynh;
    }
    
    public PhuHuynh updatePhuHuynh(String maPhuHuynh, PhuHuynh phuHuynhDetails) {
        Optional<PhuHuynh> optionalPhuHuynh = phuHuynhRepository.findById(maPhuHuynh);
        if (optionalPhuHuynh.isPresent()) {
            PhuHuynh phuHuynh = optionalPhuHuynh.get();
            phuHuynh.setHoTen(phuHuynhDetails.getHoTen());
            phuHuynh.setQuanHeVoiHocSinh(phuHuynhDetails.getQuanHeVoiHocSinh());
            phuHuynh.setThongTinLienHe(phuHuynhDetails.getThongTinLienHe());
            phuHuynh.setSoDienThoai(phuHuynhDetails.getSoDienThoai());
            phuHuynh.setEmail(phuHuynhDetails.getEmail());
            return phuHuynhRepository.save(phuHuynh);
        }
        return null;
    }
    
    public void deletePhuHuynh(String maPhuHuynh) {
        phuHuynhRepository.deleteById(maPhuHuynh);
    }
}