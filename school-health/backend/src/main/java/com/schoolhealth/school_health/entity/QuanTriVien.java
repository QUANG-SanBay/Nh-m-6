package com.schoolhealth.school_health.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quan_tri_vien")
public class QuanTriVien extends NguoiDung {
    private String maQuanTriVien;
    private String hoTen;
    // getter, setter
    public String getMaQuanTriVien() { return maQuanTriVien; }
    public void setMaQuanTriVien(String maQuanTriVien) { this.maQuanTriVien = maQuanTriVien; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
} 