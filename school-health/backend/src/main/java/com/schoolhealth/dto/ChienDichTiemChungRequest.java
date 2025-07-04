package com.schoolhealth.dto;

public class ChienDichTiemChungRequest {
    private String tenChienDich;
    private String loaiVacXin;
    private String ngayBatDau;
    private String ngayKetThuc;
    private String trangThai;
    private String diaDiem;

    // Getters and Setters
    public String getTenChienDich() { return tenChienDich; }
    public void setTenChienDich(String tenChienDich) { this.tenChienDich = tenChienDich; }
    public String getLoaiVacXin() { return loaiVacXin; }
    public void setLoaiVacXin(String loaiVacXin) { this.loaiVacXin = loaiVacXin; }
    public String getNgayBatDau() { return ngayBatDau; }
    public void setNgayBatDau(String ngayBatDau) { this.ngayBatDau = ngayBatDau; }
    public String getNgayKetThuc() { return ngayKetThuc; }
    public void setNgayKetThuc(String ngayKetThuc) { this.ngayKetThuc = ngayKetThuc; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public String getDiaDiem() { return diaDiem; }
    public void setDiaDiem(String diaDiem) { this.diaDiem = diaDiem; }
}