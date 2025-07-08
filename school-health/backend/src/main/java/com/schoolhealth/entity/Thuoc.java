package com.schoolhealth.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.UUID;
import jakarta.persistence.PrePersist;

@Entity
@Table(name = "thuoc")
public class Thuoc {
    @Id
    private String maThuoc;
    private String ten;
    private String lieuLuong;
    private String donVi;
    private String moTa;
    private String hanSuDung;

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
    public String getHanSuDung() { return hanSuDung; }
    public void setHanSuDung(String hanSuDung) { this.hanSuDung = hanSuDung;
    }
    @PrePersist
    public void ensureId() {
        if (this.maThuoc == null || this.maThuoc.isEmpty()) {
            this.maThuoc = UUID.randomUUID().toString();
        }
    }
} 