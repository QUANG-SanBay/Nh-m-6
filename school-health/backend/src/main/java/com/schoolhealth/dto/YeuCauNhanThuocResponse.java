package com.schoolhealth.dto;

import java.util.Date;

public class YeuCauNhanThuocResponse {
    private String maYeuCau;
    private String tenThuoc;
    private String lieuLuong;
    private String donVi;
    private String moTa;
    private String trangThai;
    private Date ngayTao;
    private String hoTenHocSinh;
    private String lopHocSinh;
    private String ghiChu;
    private String tinhTrangDacBiet;

    public String getMaYeuCau() { return maYeuCau; }
    public void setMaYeuCau(String maYeuCau) { this.maYeuCau = maYeuCau; }
    public String getTenThuoc() { return tenThuoc; }
    public void setTenThuoc(String tenThuoc) { this.tenThuoc = tenThuoc; }
    public String getLieuLuong() { return lieuLuong; }
    public void setLieuLuong(String lieuLuong) { this.lieuLuong = lieuLuong; }
    public String getDonVi() { return donVi; }
    public void setDonVi(String donVi) { this.donVi = donVi; }
    public String getMoTa() { return moTa; }
    public void setMoTa(String moTa) { this.moTa = moTa; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public Date getNgayTao() { return ngayTao; }
    public void setNgayTao(Date ngayTao) { this.ngayTao = ngayTao; }
    public String getHoTenHocSinh() { return hoTenHocSinh; }
    public void setHoTenHocSinh(String hoTenHocSinh) { this.hoTenHocSinh = hoTenHocSinh; }
    public String getLopHocSinh() { return lopHocSinh; }
    public void setLopHocSinh(String lopHocSinh) { this.lopHocSinh = lopHocSinh; }
    public String getGhiChu() { return ghiChu; }
    public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
    public String getTinhTrangDacBiet() { return tinhTrangDacBiet; }
    public void setTinhTrangDacBiet(String tinhTrangDacBiet) { this.tinhTrangDacBiet = tinhTrangDacBiet; }
}