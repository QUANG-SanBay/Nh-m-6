package com.schoolhealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vat_tu_y_te")
public class VatTuYTe {
    @Id
    private String maVatTu;
    private String ten;
    private String donVi;
    private String moTa;
    // getter, setter
    public String getMaVatTu() { return maVatTu; }
    public void setMaVatTu(String maVatTu) { this.maVatTu = maVatTu; }
    public String getTen() { return ten; }
    public void setTen(String ten) { this.ten = ten; }
    public String getDonVi() { return donVi; }
    public void setDonVi(String donVi) { this.donVi = donVi; }
    public String getMoTa() { return moTa; }
    public void setMoTa(String moTa) { this.moTa = moTa; }
} 