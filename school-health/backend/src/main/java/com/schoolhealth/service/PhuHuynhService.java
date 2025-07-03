package com.schoolhealth.service;

import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.repository.PhuHuynhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
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
        return phuHuynhRepository.findByEmail(email);
    }
    
    public PhuHuynh savePhuHuynh(PhuHuynh phuHuynh) {
        return phuHuynhRepository.save(phuHuynh);
    }
    
    public PhuHuynh updatePhuHuynh(String maPhuHuynh, PhuHuynh phuHuynhDetails) {
        Optional<PhuHuynh> optionalPhuHuynh = phuHuynhRepository.findById(maPhuHuynh);
        if (optionalPhuHuynh.isPresent()) {
            PhuHuynh phuHuynh = optionalPhuHuynh.get();
            phuHuynh.setHoTen(phuHuynhDetails.getHoTen());
            phuHuynh.setQuanHeVoiHocSinh(phuHuynhDetails.getQuanHeVoiHocSinh());
            phuHuynh.setThongTinLienHe(phuHuynhDetails.getThongTinLienHe());
            phuHuynh.setSoDienThoai(phuHuynhDetails.getSoDienThoai());
            // phuHuynh.setDiaChi(phuHuynhDetails.getDiaChi());
            return phuHuynhRepository.save(phuHuynh);
        }
        return null;
    }
    
    public void deletePhuHuynh(String maPhuHuynh) {
        phuHuynhRepository.deleteById(maPhuHuynh);
    }
} 