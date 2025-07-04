package com.schoolhealth.repository;

import com.schoolhealth.entity.ChienDichTiemChung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChienDichTiemChungRepository extends JpaRepository<ChienDichTiemChung, String> {
}
