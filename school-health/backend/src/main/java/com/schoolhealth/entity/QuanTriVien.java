package com.schoolhealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "quan_tri_vien")
public class QuanTriVien extends NguoiDung {
    @Id
    // Loại bỏ @GeneratedValue để tránh xung đột
    private String maQuanTriVien;
    private String hoTen;
    
    // Thêm @PrePersist để kiểm tra ID trước khi persist
    @PrePersist
    public void prePersist() {
        if (this.maQuanTriVien == null || this.maQuanTriVien.trim().isEmpty()) {
            System.out.println("Warning: QuanTriVien ID was not set before persist!");
        }
    }
    
    // getter, setter
    public String getMaQuanTriVien() { return maQuanTriVien; }
    public void setMaQuanTriVien(String maQuanTriVien) { this.maQuanTriVien = maQuanTriVien; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
}