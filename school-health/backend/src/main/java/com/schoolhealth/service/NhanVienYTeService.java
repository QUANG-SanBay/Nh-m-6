package com.schoolhealth.service;

import com.schoolhealth.entity.NhanVienYTe;
import com.schoolhealth.repository.NhanVienYTeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NhanVienYTeService {
    
    @Autowired
    private NhanVienYTeRepository nhanVienYTeRepository;
    
    public List<NhanVienYTe> getAllNhanVienYTe() {
        return nhanVienYTeRepository.findAll();
    }
    
    public Optional<NhanVienYTe> getNhanVienYTeById(String maNhanVienYTe) {
        return nhanVienYTeRepository.findById(maNhanVienYTe);
    }
    
    public NhanVienYTe saveNhanVienYTe(NhanVienYTe nhanVienYTe) {
        return nhanVienYTeRepository.save(nhanVienYTe);
    }
    
    // Cập nhật phương thức save với xử lý ID an toàn
    public NhanVienYTe save(NhanVienYTe nhanVienYTe) {
        // Kiểm tra xem có phải là đối tượng mới hay không
        if (nhanVienYTe.getMaNhanVienYTe() == null || nhanVienYTe.getMaNhanVienYTe().trim().isEmpty()) {
            // Sinh mã nhân viên y tế tự động với thread-safe
            String maNhanVienYTe = generateMaNhanVienYTeSafe();
            nhanVienYTe.setMaNhanVienYTe(maNhanVienYTe);
        }
        
        // Kiểm tra xem ID đã tồn tại chưa
        Optional<NhanVienYTe> existing = nhanVienYTeRepository.findById(nhanVienYTe.getMaNhanVienYTe());
        if (existing.isPresent()) {
            // Nếu đã tồn tại, tạo ID mới
            String newId = generateMaNhanVienYTeSafe();
            nhanVienYTe.setMaNhanVienYTe(newId);
        }
        
        return nhanVienYTeRepository.save(nhanVienYTe);
    }
    
    // Phương thức sinh mã an toàn với thread
    private synchronized String generateMaNhanVienYTeSafe() {
        String maNhanVienYTe;
        int attempts = 0;
        
        do {
            // Lấy số thứ tự tiếp theo
            long count = nhanVienYTeRepository.count() + 1 + attempts;
            maNhanVienYTe = String.format("NV%06d", count);
            attempts++;
        } while (nhanVienYTeRepository.existsById(maNhanVienYTe) && attempts < 100);
        
        if (attempts >= 100) {
            // Fallback với timestamp nếu không tìm được ID duy nhất
            maNhanVienYTe = "NV" + System.currentTimeMillis();
        }
        
        return maNhanVienYTe;
    }
    
    public NhanVienYTe updateNhanVienYTe(String maNhanVienYTe, NhanVienYTe nhanVienYTeDetails) {
        Optional<NhanVienYTe> optionalNhanVienYTe = nhanVienYTeRepository.findById(maNhanVienYTe);
        if (optionalNhanVienYTe.isPresent()) {
            NhanVienYTe nhanVienYTe = optionalNhanVienYTe.get();
            nhanVienYTe.setHoTen(nhanVienYTeDetails.getHoTen());
            nhanVienYTe.setSoDienThoai(nhanVienYTeDetails.getSoDienThoai());
            nhanVienYTe.setEmail(nhanVienYTeDetails.getEmail());
            return nhanVienYTeRepository.save(nhanVienYTe);
        }
        return null;
    }
    
    public void deleteNhanVienYTe(String maNhanVienYTe) {
        nhanVienYTeRepository.deleteById(maNhanVienYTe);
    }
}