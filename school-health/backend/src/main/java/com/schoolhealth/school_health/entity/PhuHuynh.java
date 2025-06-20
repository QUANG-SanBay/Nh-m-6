package com.schoolhealth.school_health.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "phu_huynh")
public class PhuHuynh extends NguoiDung {
    private String maPhuHuynh;
    private String hoTen;
    private String quanHeVoiHocSinh;
    private String thongTinLienHe;

    @OneToMany(mappedBy = "phuHuynh")
    private List<HocSinh> hocSinhList;

    public String getMaPhuHuynh() { return maPhuHuynh; }
    public void setMaPhuHuynh(String maPhuHuynh) { this.maPhuHuynh = maPhuHuynh; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public String getQuanHeVoiHocSinh() { return quanHeVoiHocSinh; }
    public void setQuanHeVoiHocSinh(String quanHeVoiHocSinh) { this.quanHeVoiHocSinh = quanHeVoiHocSinh; }
    public String getThongTinLienHe() { return thongTinLienHe; }
    public void setThongTinLienHe(String thongTinLienHe) { this.thongTinLienHe = thongTinLienHe; }
    public List<HocSinh> getHocSinhList() { return hocSinhList; }
    public void setHocSinhList(List<HocSinh> hocSinhList) { this.hocSinhList = hocSinhList; }
} 