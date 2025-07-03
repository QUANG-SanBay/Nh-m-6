package com.schoolhealth.repository;

import com.schoolhealth.entity.Thuoc;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ThuocRepository extends JpaRepository<Thuoc, String> {
    List<Thuoc> findByTenContainingIgnoreCase(String ten);
}
