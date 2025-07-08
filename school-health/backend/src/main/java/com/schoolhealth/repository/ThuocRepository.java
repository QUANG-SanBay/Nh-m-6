package com.schoolhealth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schoolhealth.entity.Thuoc;

public interface ThuocRepository extends JpaRepository<Thuoc, String> {
    List<Thuoc> findByTenContainingIgnoreCase(String ten);
}
