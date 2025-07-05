package com.schoolhealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quan_ly_nha_truong")
public class QuanLyNhaTruong extends NguoiDung {
    @Id
    // Loại bỏ @GeneratedValue để tránh xung đột
    private String maQuanLy;
    private String hoTen;
    
    // Thêm @PrePersist để kiểm tra ID trước khi persist
    @PrePersist
    public void prePersist() {
        if (this.maQuanLy == null || this.maQuanLy.trim().isEmpty()) {
            System.out.println("Warning: QuanLyNhaTruong ID was not set before persist!");
        }
    }
    
    // getter, setter
    public String getMaQuanLy() { return maQuanLy; }
    public void setMaQuanLy(String maQuanLy) { this.maQuanLy = maQuanLy; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
}