package com.schoolhealth.dto;

import java.util.Date;

public class ProfileStudentDTO {
    private String maHocSinh;
    private String hoTen;
    private String lop; // ✅ Thêm dòng này
    private String gioiTinh;
    private Date ngaySinh;
    private String diaChi;
    private String tenNguoiLienHe;
    private String sdtNguoiLienHe;

    // Getters và Setters
    public String getMaHocSinh() {
        return maHocSinh;
    }

    public void setMaHocSinh(String maHocSinh) {
        this.maHocSinh = maHocSinh;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getLop() {
        return lop;
    }

    public void setLop(String lop) {
        this.lop = lop;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public Date getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(Date ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getTenNguoiLienHe() {
        return tenNguoiLienHe;
    }

    public void setTenNguoiLienHe(String tenNguoiLienHe) {
        this.tenNguoiLienHe = tenNguoiLienHe;
    }

    public String getSdtNguoiLienHe() {
        return sdtNguoiLienHe;
    }

    public void setSdtNguoiLienHe(String sdtNguoiLienHe) {
        this.sdtNguoiLienHe = sdtNguoiLienHe;
    }
}
