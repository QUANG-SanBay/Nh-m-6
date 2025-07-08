// LichSuKhamBenhDTO.java
package com.schoolhealth.dto;

import java.time.LocalDateTime;

public class LichSuKhamBenhDTO {
    private Long id;
    private LocalDateTime thoiGianKham;
    private String chanDoan;
    private String dieuTri;
    private String thuocDaDung;
    private String moTaTiemChung;
    private String tenVaccine;
    private String trangThai;
    private String diaDiem;
    private String bienPhapXuLy;
    private Boolean thongBaoPhuHuynh;
    private String maHocSinh;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getThoiGianKham() {
        return thoiGianKham;
    }

    public void setThoiGianKham(LocalDateTime thoiGianKham) {
        this.thoiGianKham = thoiGianKham;
    }

    public String getChanDoan() {
        return chanDoan;
    }

    public void setChanDoan(String chanDoan) {
        this.chanDoan = chanDoan;
    }

    public String getDieuTri() {
        return dieuTri;
    }

    public void setDieuTri(String dieuTri) {
        this.dieuTri = dieuTri;
    }

    public String getThuocDaDung() {
        return thuocDaDung;
    }

    public void setThuocDaDung(String thuocDaDung) {
        this.thuocDaDung = thuocDaDung;
    }

    public String getMoTaTiemChung() {
        return moTaTiemChung;
    }

    public void setMoTaTiemChung(String moTaTiemChung) {
        this.moTaTiemChung = moTaTiemChung;
    }

    public String getTenVaccine() {
        return tenVaccine;
    }

    public void setTenVaccine(String tenVaccine) {
        this.tenVaccine = tenVaccine;
    }

    public String getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(String trangThai) {
        this.trangThai = trangThai;
    }

    public String getDiaDiem() {
        return diaDiem;
    }

    public void setDiaDiem(String diaDiem) {
        this.diaDiem = diaDiem;
    }

    public String getBienPhapXuLy() {
        return bienPhapXuLy;
    }

    public void setBienPhapXuLy(String bienPhapXuLy) {
        this.bienPhapXuLy = bienPhapXuLy;
    }

    public Boolean getThongBaoPhuHuynh() {
        return thongBaoPhuHuynh;
    }

    public void setThongBaoPhuHuynh(Boolean thongBaoPhuHuynh) {
        this.thongBaoPhuHuynh = thongBaoPhuHuynh;
    }

    public String getMaHocSinh() {
        return maHocSinh;
    }

    public void setMaHocSinh(String maHocSinh) {
        this.maHocSinh = maHocSinh;
    }
}
