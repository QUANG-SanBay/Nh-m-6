package com.schoolhealth.service;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.repository.HoSoSucKhoeHocSinhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoSoSucKhoeHocSinhService {
    @Autowired
    private HoSoSucKhoeHocSinhRepository repository;

    public List<HoSoSucKhoeHocSinh> getByHocSinh(String maHocSinh) {
        return repository.findByHocSinh_MaHocSinh(maHocSinh);
    }

    public HoSoSucKhoeHocSinh saveOrUpdate(HoSoSucKhoeHocSinh hoSo) {
        return repository.save(hoSo);
    }

    public Optional<HoSoSucKhoeHocSinh> getById(String id) {
        return repository.findById(id);
    }
} 