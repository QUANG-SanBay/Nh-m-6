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
    
    public Optional<PhuHuynh> getPhuHuynhByEmail(String email) {
        try {
            PhuHuynh phuHuynh = phuHuynhRepository.findByEmail(email);
            return Optional.ofNullable(phuHuynh);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi tìm phụ huynh theo email: " + e.getMessage());
        }
    }
    
    public Optional<PhuHuynh> getPhuHuynhByUsername(String username) {
        try {
            System.out.println("=== DEBUG: getPhuHuynhByUsername Service ===");
            System.out.println("Looking for username: '" + username + "'");
            System.out.println("Username length: " + username.length());
            
            // Thử nhiều cách tìm kiếm
            PhuHuynh phuHuynh = null;
            
            // Cách 1: Tìm theo tenDangNhap
            phuHuynh = phuHuynhRepository.findByTenDangNhap(username);
            System.out.println("findByTenDangNhap result: " + (phuHuynh != null ? phuHuynh.getHoTen() : "null"));
            
            // Cách 2: Tìm theo tenDangNhap custom query
            if (phuHuynh == null) {
                phuHuynh = phuHuynhRepository.findByTenDangNhapCustom(username);
                System.out.println("findByTenDangNhapCustom result: " + (phuHuynh != null ? phuHuynh.getHoTen() : "null"));
            }
            
            // Cách 3: Tìm theo hoTen (vì có thể tenDangNhap = hoTen)
            if (phuHuynh == null) {
                phuHuynh = phuHuynhRepository.findByHoTen(username);
                System.out.println("findByHoTen result: " + (phuHuynh != null ? phuHuynh.getHoTen() : "null"));
            }
            
            // Debug: In ra tất cả phụ huynh để kiểm tra
            List<PhuHuynh> allPhuHuynh = phuHuynhRepository.findAll();
            System.out.println("=== ALL PHU HUYNH ===");
            for (PhuHuynh p : allPhuHuynh) {
                System.out.println("ID: " + p.getMaPhuHuynh() + 
                                 ", TenDangNhap: '" + p.getTenDangNhap() + "'" +
                                 ", HoTen: '" + p.getHoTen() + "'" +
                                 ", Email: '" + p.getEmail() + "'");
            }
            
            return Optional.ofNullable(phuHuynh);
            
        } catch (Exception e) {
            System.err.println("Error in getPhuHuynhByUsername: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Lỗi khi tìm phụ huynh theo username: " + e.getMessage());
        }
    }
    
    public PhuHuynh findByEmail(String email) {
        return phuHuynhRepository.findByEmail(email);
    }
    
    public PhuHuynh savePhuHuynh(PhuHuynh phuHuynh) {
        return save(phuHuynh);
    }
    
    public PhuHuynh save(PhuHuynh phuHuynh) {
        try {
            // Kiểm tra xem có phải là đối tượng mới hay không
            if (phuHuynh.getMaPhuHuynh() == null || phuHuynh.getMaPhuHuynh().trim().isEmpty()) {
                String maPhuHuynh = generateMaPhuHuynhSafe();
                phuHuynh.setMaPhuHuynh(maPhuHuynh);
            }
            
            // Kiểm tra trùng lặp email
            PhuHuynh existingByEmail = phuHuynhRepository.findByEmail(phuHuynh.getEmail());
            if (existingByEmail != null && !existingByEmail.getMaPhuHuynh().equals(phuHuynh.getMaPhuHuynh())) {
                throw new RuntimeException("Email đã được sử dụng bởi phụ huynh khác");
            }
            
            // Kiểm tra xem ID đã tồn tại chưa
            Optional<PhuHuynh> existing = phuHuynhRepository.findById(phuHuynh.getMaPhuHuynh());
            if (existing.isPresent() && !existing.get().getEmail().equals(phuHuynh.getEmail())) {
                String newId = generateMaPhuHuynhSafe();
                phuHuynh.setMaPhuHuynh(newId);
            }
            
            return phuHuynhRepository.save(phuHuynh);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi lưu thông tin phụ huynh: " + e.getMessage());
        }
    }
    
    private synchronized String generateMaPhuHuynhSafe() {
        String maPhuHuynh;
        int attempts = 0;
        
        do {
            long count = phuHuynhRepository.count() + 1 + attempts;
            maPhuHuynh = String.format("PH%06d", count);
            attempts++;
        } while (phuHuynhRepository.existsById(maPhuHuynh) && attempts < 100);
        
        if (attempts >= 100) {
            maPhuHuynh = "PH" + System.currentTimeMillis();
        }
        
        return maPhuHuynh;
    }
    
    public PhuHuynh updatePhuHuynh(String maPhuHuynh, PhuHuynh phuHuynhDetails) {
        try {
            Optional<PhuHuynh> optionalPhuHuynh = phuHuynhRepository.findById(maPhuHuynh);
            if (!optionalPhuHuynh.isPresent()) {
                throw new RuntimeException("Không tìm thấy phụ huynh với mã: " + maPhuHuynh);
            }
            
            PhuHuynh phuHuynh = optionalPhuHuynh.get();
            
            // Kiểm tra trùng lặp email
            if (!phuHuynh.getEmail().equals(phuHuynhDetails.getEmail())) {
                PhuHuynh existingByEmail = phuHuynhRepository.findByEmail(phuHuynhDetails.getEmail());
                if (existingByEmail != null && !existingByEmail.getMaPhuHuynh().equals(maPhuHuynh)) {
                    throw new RuntimeException("Email đã được sử dụng bởi phụ huynh khác");
                }
            }
            
            // Cập nhật thông tin cơ bản
            phuHuynh.setHoTen(phuHuynhDetails.getHoTen());
            phuHuynh.setQuanHeVoiHocSinh(phuHuynhDetails.getQuanHeVoiHocSinh());
            phuHuynh.setThongTinLienHe(phuHuynhDetails.getThongTinLienHe());
            phuHuynh.setSoDienThoai(phuHuynhDetails.getSoDienThoai());
            phuHuynh.setEmail(phuHuynhDetails.getEmail());
            
            return phuHuynhRepository.save(phuHuynh);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi cập nhật thông tin phụ huynh: " + e.getMessage());
        }
    }
    
    public void deletePhuHuynh(String maPhuHuynh) {
        try {
            if (!phuHuynhRepository.existsById(maPhuHuynh)) {
                throw new RuntimeException("Không tìm thấy phụ huynh với mã: " + maPhuHuynh);
            }
            phuHuynhRepository.deleteById(maPhuHuynh);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi xóa phụ huynh: " + e.getMessage());
        }
    }
}