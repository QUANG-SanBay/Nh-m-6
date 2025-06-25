package com.schoolhealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quan_ly_nha_truong")
public class QuanLyNhaTruong extends NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String maQuanLy;
    private String hoTen;
    // getter, setter
    public String getMaQuanLy() { return maQuanLy; }
    public void setMaQuanLy(String maQuanLy) { this.maQuanLy = maQuanLy; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
} 