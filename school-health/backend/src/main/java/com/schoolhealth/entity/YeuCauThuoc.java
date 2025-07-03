package com.schoolhealth.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "yeu_cau_thuoc")
public class YeuCauThuoc {
    @Id
    private String maYeuCau;
    private String tenThuoc;
    private String lieuLuong;
    private String donVi;
    private String moTa;
    private String lyDoSuDung;
    private String trangThai; // "CHO_DUYET", "DA_DUYET", "TU_CHOI"
    private String ghiChu;
    private String tinhTrangDacBiet;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayTao;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date ngayCapNhat;

    @ManyToOne
    @JoinColumn(name = "ma_hoc_sinh", referencedColumnName = "maHocSinh")
    private HocSinh hocSinh;

    @ManyToOne
    @JoinColumn(name = "ma_phu_huynh", referencedColumnName = "maPhuHuynh")
    private PhuHuynh phuHuynh;

    @ManyToOne
    @JoinColumn(name = "ma_thuoc", referencedColumnName = "maThuoc", nullable = true)
    private Thuoc thuoc;

    @PrePersist
    public void prePersist() {
        if (this.maYeuCau == null || this.maYeuCau.isEmpty()) {
            this.maYeuCau = UUID.randomUUID().toString();
        }
        if (this.ngayTao == null) {
            this.ngayTao = new Date();
        }
        if (this.trangThai == null) {
            this.trangThai = "CHO_DUYET";
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.ngayCapNhat = new Date();
    }

    // Getters and Setters
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
    public String getLyDoSuDung() { return lyDoSuDung; }
    public void setLyDoSuDung(String lyDoSuDung) { this.lyDoSuDung = lyDoSuDung; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public String getGhiChu() { return ghiChu; }
    public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
    public String getTinhTrangDacBiet() { return tinhTrangDacBiet; }
    public void setTinhTrangDacBiet(String tinhTrangDacBiet) { this.tinhTrangDacBiet = tinhTrangDacBiet; }
    public Date getNgayTao() { return ngayTao; }
    public void setNgayTao(Date ngayTao) { this.ngayTao = ngayTao; }
    public Date getNgayCapNhat() { return ngayCapNhat; }
    public void setNgayCapNhat(Date ngayCapNhat) { this.ngayCapNhat = ngayCapNhat; }
    public HocSinh getHocSinh() { return hocSinh; }
    public void setHocSinh(HocSinh hocSinh) { this.hocSinh = hocSinh; }
    public PhuHuynh getPhuHuynh() { return phuHuynh; }
    public void setPhuHuynh(PhuHuynh phuHuynh) { this.phuHuynh = phuHuynh; }
    public Thuoc getThuoc() { return thuoc; }
    public void setThuoc(Thuoc thuoc) { this.thuoc = thuoc; }
}
