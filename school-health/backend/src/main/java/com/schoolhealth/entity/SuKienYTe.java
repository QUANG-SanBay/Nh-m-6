package com.schoolhealth.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "su_kien_y_te")
public class SuKienYTe {
    @Id
    private String maSuKien;
    private String loaiSuKien;
    private String moTa;
    private LocalDateTime thoiGianSuKien;
    private String diaDiem;
    private String bienPhapXuLy;
    private String thuocDaSuDung;
    private String trangThai;
    private Boolean thongBaoPhuHuynh;
    private Integer soLuongThamGia;

    @ManyToOne
    @JoinColumn(name = "ma_hoc_sinh", referencedColumnName = "maHocSinh")
    private HocSinh hocSinh;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien_y_te", referencedColumnName = "maNhanVienYTe")
    private NhanVienYTe nhanVienYTe;

    public String getMaSuKien() { return maSuKien; }
    public void setMaSuKien(String maSuKien) { this.maSuKien = maSuKien; }
    public String getLoaiSuKien() { return loaiSuKien; }
    public void setLoaiSuKien(String loaiSuKien) { this.loaiSuKien = loaiSuKien; }
    public String getMoTa() { return moTa; }
    public void setMoTa(String moTa) { this.moTa = moTa; }
    public LocalDateTime getThoiGianSuKien() { return thoiGianSuKien; }
    public void setThoiGianSuKien(LocalDateTime thoiGianSuKien) { this.thoiGianSuKien = thoiGianSuKien; }
    public String getDiaDiem() { return diaDiem; }
    public void setDiaDiem(String diaDiem) { this.diaDiem = diaDiem; }
    public String getBienPhapXuLy() { return bienPhapXuLy; }
    public void setBienPhapXuLy(String bienPhapXuLy) { this.bienPhapXuLy = bienPhapXuLy; }
    public String getThuocDaSuDung() { return thuocDaSuDung; }
    public void setThuocDaSuDung(String thuocDaSuDung) { this.thuocDaSuDung = thuocDaSuDung; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public Boolean getThongBaoPhuHuynh() { return thongBaoPhuHuynh; }
    public void setThongBaoPhuHuynh(Boolean thongBaoPhuHuynh) { this.thongBaoPhuHuynh = thongBaoPhuHuynh; }
    public Integer getSoLuongThamGia() { return soLuongThamGia; }
    public void setSoLuongThamGia(Integer soLuongThamGia) { this.soLuongThamGia = soLuongThamGia; }
    public HocSinh getHocSinh() { return hocSinh; }
    public void setHocSinh(HocSinh hocSinh) { this.hocSinh = hocSinh; }
    public NhanVienYTe getNhanVienYTe() { return nhanVienYTe; }
    public void setNhanVienYTe(NhanVienYTe nhanVienYTe) { this.nhanVienYTe = nhanVienYTe; }
} 