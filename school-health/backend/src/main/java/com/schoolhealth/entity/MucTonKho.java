package com.schoolhealth.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "muc_ton_kho")
public class MucTonKho {
    @Id
    private String maMucTonKho;
    private String loaiMuc; // "Thuoc" hoặc "VatTuYTe"
    private String maMucThamChieu;
    private int soLuong;
    @Temporal(TemporalType.DATE)
    private Date ngayHetHan;
    @Temporal(TemporalType.DATE)
    private Date ngayNhapKhoCuoi;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien_y_te")
    private NhanVienYTe nhanVienYTe;

    @ManyToOne
    @JoinColumn(name = "ma_thuoc", nullable = true)
    private Thuoc thuoc;

    @ManyToOne
    @JoinColumn(name = "ma_vat_tu", nullable = true)
    private VatTuYTe vatTuYTe;

    public String getMaMucTonKho() { return maMucTonKho; }
    public void setMaMucTonKho(String maMucTonKho) { this.maMucTonKho = maMucTonKho; }
    public String getLoaiMuc() { return loaiMuc; }
    public void setLoaiMuc(String loaiMuc) { this.loaiMuc = loaiMuc; }
    public String getMaMucThamChieu() { return maMucThamChieu; }
    public void setMaMucThamChieu(String maMucThamChieu) { this.maMucThamChieu = maMucThamChieu; }
    public int getSoLuong() { return soLuong; }
    public void setSoLuong(int soLuong) { this.soLuong = soLuong; }
    public Date getNgayHetHan() { return ngayHetHan; }
    public void setNgayHetHan(Date ngayHetHan) { this.ngayHetHan = ngayHetHan; }
    public Date getNgayNhapKhoCuoi() { return ngayNhapKhoCuoi; }
    public void setNgayNhapKhoCuoi(Date ngayNhapKhoCuoi) { this.ngayNhapKhoCuoi = ngayNhapKhoCuoi; }
    public NhanVienYTe getNhanVienYTe() { return nhanVienYTe; }
    public void setNhanVienYTe(NhanVienYTe nhanVienYTe) { this.nhanVienYTe = nhanVienYTe; }
    public Thuoc getThuoc() { return thuoc; }
    public void setThuoc(Thuoc thuoc) { this.thuoc = thuoc; }
    public VatTuYTe getVatTuYTe() { return vatTuYTe; }
    public void setVatTuYTe(VatTuYTe vatTuYTe) { this.vatTuYTe = vatTuYTe; }
} 