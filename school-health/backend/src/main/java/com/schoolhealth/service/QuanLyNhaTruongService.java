package com.schoolhealth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired ;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.schoolhealth.entity.QuanLyNhaTruong;
import com.schoolhealth.repository.QuanLyNhaTruongRepository;


// import java.util.UUID;

@Service
@Transactional
public class QuanLyNhaTruongService {

    @Autowired
    private QuanLyNhaTruongRepository quanLyNhaTruongRepository;
    
    public List<QuanLyNhaTruong> getAllQuanLyNhaTruong() {
        return quanLyNhaTruongRepository.findAll();
    }
    
    public Optional<QuanLyNhaTruong> getQuanLyNhaTruongById(String maQuanLyNhaTruong) {
        return quanLyNhaTruongRepository.findById(maQuanLyNhaTruong);
    }
    
    public QuanLyNhaTruong saveQuanLyNhaTruong(QuanLyNhaTruong quanLyNhaTruong) {
        return quanLyNhaTruongRepository.save(quanLyNhaTruong);
    }
    
    // Cập nhật phương thức save với xử lý ID an toàn
    public QuanLyNhaTruong save(QuanLyNhaTruong quanLyNhaTruong) {
        // Kiểm tra xem có phải là đối tượng mới hay không
        if (quanLyNhaTruong.getmaQuanLy() == null || quanLyNhaTruong.getmaQuanLy().trim().isEmpty()) {
            // Sinh mã quản lý nhà trường tự động với thread-safe
            String maQuanLyNhaTruong = generateMaQuanLyNhaTruongSafe();
            quanLyNhaTruong.setmaQuanLy(maQuanLyNhaTruong);
        }
        
        // Kiểm tra xem ID đã tồn tại chưa
        Optional<QuanLyNhaTruong> existing = quanLyNhaTruongRepository.findById(quanLyNhaTruong.getmaQuanLy());
        if (existing.isPresent()) {
            // Nếu đã tồn tại, tạo ID mới
            String newId = generateMaQuanLyNhaTruongSafe();
            quanLyNhaTruong.setmaQuanLy(newId);
        }
        
        return quanLyNhaTruongRepository.save(quanLyNhaTruong);
    }
    
    // Phương thức sinh mã an toàn với thread
    private synchronized String generateMaQuanLyNhaTruongSafe() {
        String maQuanLyNhaTruong;
        int attempts = 0;
        
        do {
            // Lấy số thứ tự tiếp theo
            long count = quanLyNhaTruongRepository.count() + 1 + attempts;
            maQuanLyNhaTruong = String.format("NV%06d", count);
            attempts++;
        } while (quanLyNhaTruongRepository.existsById(maQuanLyNhaTruong) && attempts < 100);
        
        if (attempts >= 100) {
            // Fallback với timestamp nếu không tìm được ID duy nhất
            maQuanLyNhaTruong = "NV" + System.currentTimeMillis();
        }
        
        return maQuanLyNhaTruong;
    }
    
    public QuanLyNhaTruong updateQuanLyNhaTruong(String maQuanLyNhaTruong, QuanLyNhaTruong QuanLyNhaTruongDetails) {
        Optional<QuanLyNhaTruong> optionalQuanLyNhaTruong = quanLyNhaTruongRepository.findById(maQuanLyNhaTruong);
        if (optionalQuanLyNhaTruong.isPresent()) {
            QuanLyNhaTruong QuanLyNhaTruong = optionalQuanLyNhaTruong.get();
            QuanLyNhaTruong.setHoTen(QuanLyNhaTruongDetails.getHoTen());
            QuanLyNhaTruong.setSoDienThoai(QuanLyNhaTruongDetails.getSoDienThoai());
            QuanLyNhaTruong.setEmail(QuanLyNhaTruongDetails.getEmail());
            return quanLyNhaTruongRepository.save(QuanLyNhaTruong);
        }
        return null;
    }
    
    public void deleteQuanLyNhaTruong(String maQuanLyNhaTruong) {
        quanLyNhaTruongRepository.deleteById(maQuanLyNhaTruong);
    }
}
