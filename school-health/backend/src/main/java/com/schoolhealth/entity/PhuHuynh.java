package com.schoolhealth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "phu_huynh")
public class PhuHuynh extends NguoiDung {
    @Id
    // Loại bỏ @GeneratedValue(strategy = GenerationType.UUID) để tránh xung đột
    private String maPhuHuynh;
    private String hoTen;
    private String quanHeVoiHocSinh;
    private String thongTinLienHe;

    // Thêm @PrePersist để kiểm tra ID trước khi persist
    @PrePersist
    public void prePersist() {
        if (this.maPhuHuynh == null || this.maPhuHuynh.trim().isEmpty()) {
            // Để trống, để PhuHuynhService xử lý
            System.out.println("Warning: PhuHuynh ID was not set before persist!");
        }
    }

    public String getMaPhuHuynh() { return maPhuHuynh; }
    public void setMaPhuHuynh(String maPhuHuynh) { this.maPhuHuynh = maPhuHuynh; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public String getQuanHeVoiHocSinh() { return quanHeVoiHocSinh; }
    public void setQuanHeVoiHocSinh(String quanHeVoiHocSinh) { this.quanHeVoiHocSinh = quanHeVoiHocSinh; }
    public String getThongTinLienHe() { return thongTinLienHe; }
    public void setThongTinLienHe(String thongTinLienHe) { this.thongTinLienHe = thongTinLienHe; }
}