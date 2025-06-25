package com.schoolhealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "phu_huynh")
public class PhuHuynh extends NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String maPhuHuynh;
    private String hoTen;
    private String quanHeVoiHocSinh;
    private String thongTinLienHe;

    public String getMaPhuHuynh() { return maPhuHuynh; }
    public void setMaPhuHuynh(String maPhuHuynh) { this.maPhuHuynh = maPhuHuynh; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public String getQuanHeVoiHocSinh() { return quanHeVoiHocSinh; }
    public void setQuanHeVoiHocSinh(String quanHeVoiHocSinh) { this.quanHeVoiHocSinh = quanHeVoiHocSinh; }
    public String getThongTinLienHe() { return thongTinLienHe; }
    public void setThongTinLienHe(String thongTinLienHe) { this.thongTinLienHe = thongTinLienHe; }
} 