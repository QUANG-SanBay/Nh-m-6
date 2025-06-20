package com.schoolhealth.school_health.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "thuoc")
public class Thuoc {
    @Id
    private String maThuoc;
    private String ten;
    private String lieuLuong;
    private String donVi;
    private String moTa;

    public String getMaThuoc() { return maThuoc; }
    public void setMaThuoc(String maThuoc) { this.maThuoc = maThuoc; }
    public String getTen() { return ten; }
    public void setTen(String ten) { this.ten = ten; }
    public String getLieuLuong() { return lieuLuong; }
    public void setLieuLuong(String lieuLuong) { this.lieuLuong = lieuLuong; }
    public String getDonVi() { return donVi; }
    public void setDonVi(String donVi) { this.donVi = donVi; }
    public String getMoTa() { return moTa; }
    public void setMoTa(String moTa) { this.moTa = moTa; }
} 