package com.schoolhealth.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
public interface HoSoSucKhoeHocSinhRepository extends JpaRepository<HoSoSucKhoeHocSinh, String> {
    List<HoSoSucKhoeHocSinh> findByHocSinh_MaHocSinh(String maHocSinh);
    List<HoSoSucKhoeHocSinh> findByHocSinh_PhuHuynh_MaPhuHuynh(String maPhuHuynh);
    List<HoSoSucKhoeHocSinh> findByNgayCapNhatCuoi(Date ngayCapNhatCuoi);
   
}