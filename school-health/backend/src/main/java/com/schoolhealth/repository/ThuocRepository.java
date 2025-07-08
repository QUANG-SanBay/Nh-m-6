package com.schoolhealth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import com.schoolhealth.entity.Thuoc;

public interface ThuocRepository extends JpaRepository<Thuoc, String> {
    List<Thuoc> findByTenContainingIgnoreCase(String ten);
}
