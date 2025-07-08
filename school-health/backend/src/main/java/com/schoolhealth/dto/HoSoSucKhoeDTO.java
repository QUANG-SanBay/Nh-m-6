package com.schoolhealth.dto;

import java.util.UUID;

public class HoSoSucKhoeDTO {
    private UUID maHoSo;
    private String maHocSinh;

    private double chieuCao;
    private double canNang;
    private String nhomMau;

    private String thiLuc;
    private String thinhLuc;

    private String tienSuDieuTri;
    private String benhManTinh;
    private String diUng;

    private String ketQuaRangMieng;
    private String ghiChu;

    private String anhHocSinh; // base64 image

    // Getters and setters
    public UUID getMaHoSo() {
        return maHoSo;
    }

    public void setMaHoSo(UUID maHoSo) {
        this.maHoSo = maHoSo;
    }

    public String getMaHocSinh() {
        return maHocSinh;
    }

    public void setMaHocSinh(String maHocSinh) {
        this.maHocSinh = maHocSinh;
    }

    public double getChieuCao() {
        return chieuCao;
    }

    public void setChieuCao(double chieuCao) {
        this.chieuCao = chieuCao;
    }

    public double getCanNang() {
        return canNang;
    }

    public void setCanNang(double canNang) {
        this.canNang = canNang;
    }

    public String getNhomMau() {
        return nhomMau;
    }

    public void setNhomMau(String nhomMau) {
        this.nhomMau = nhomMau;
    }

    public String getThiLuc() {
        return thiLuc;
    }

    public void setThiLuc(String thiLuc) {
        this.thiLuc = thiLuc;
    }

    public String getThinhLuc() {
        return thinhLuc;
    }

    public void setThinhLuc(String thinhLuc) {
        this.thinhLuc = thinhLuc;
    }

    public String getTienSuDieuTri() {
        return tienSuDieuTri;
    }

    public void setTienSuDieuTri(String tienSuDieuTri) {
        this.tienSuDieuTri = tienSuDieuTri;
    }

    public String getBenhManTinh() {
        return benhManTinh;
    }

    public void setBenhManTinh(String benhManTinh) {
        this.benhManTinh = benhManTinh;
    }

    public String getDiUng() {
        return diUng;
    }

    public void setDiUng(String diUng) {
        this.diUng = diUng;
    }

    public String getKetQuaRangMieng() {
        return ketQuaRangMieng;
    }

    public void setKetQuaRangMieng(String ketQuaRangMieng) {
        this.ketQuaRangMieng = ketQuaRangMieng;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getAnhHocSinh() {
        return anhHocSinh;
    }

    public void setAnhHocSinh(String anhHocSinh) {
        this.anhHocSinh = anhHocSinh;
    }
}
