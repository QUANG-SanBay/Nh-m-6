package com.schoolhealth.school_health.service;

import com.schoolhealth.school_health.entity.HocSinh;
import com.schoolhealth.school_health.repository.HocSinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HocSinhService {
    @Autowired
    private HocSinhRepository hocSinhRepository;

    public List<HocSinh> findAll() {
        return hocSinhRepository.findAll();
    }

    public Optional<HocSinh> findById(String id) {
        return hocSinhRepository.findById(id);
    }

    public HocSinh save(HocSinh hocSinh) {
        return hocSinhRepository.save(hocSinh);
    }

    public void deleteById(String id) {
        hocSinhRepository.deleteById(id);
    }
} 