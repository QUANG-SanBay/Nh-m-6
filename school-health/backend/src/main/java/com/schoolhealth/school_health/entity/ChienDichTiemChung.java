package com.schoolhealth.school_health.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "chien_dich_tiem_chung")
public class ChienDichTiemChung {
    @Id
    private String maChienDich;
    private String tenChienDich;
    private String loaiVacXin;
    @Temporal(TemporalType.DATE)
    private Date ngayBatDau;
    @Temporal(TemporalType.DATE)
    private Date ngayKetThuc;
    private String trangThai;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien_y_te")
    private NhanVienYTe nhanVienYTe;

    @OneToMany(mappedBy = "chienDichTiemChung")
    private List<HoSoTiemChung> hoSoTiemChungList;

    public String getMaChienDich() { return maChienDich; }
    public void setMaChienDich(String maChienDich) { this.maChienDich = maChienDich; }
    public String getTenChienDich() { return tenChienDich; }
    public void setTenChienDich(String tenChienDich) { this.tenChienDich = tenChienDich; }
    public String getLoaiVacXin() { return loaiVacXin; }
    public void setLoaiVacXin(String loaiVacXin) { this.loaiVacXin = loaiVacXin; }
    public Date getNgayBatDau() { return ngayBatDau; }
    public void setNgayBatDau(Date ngayBatDau) { this.ngayBatDau = ngayBatDau; }
    public Date getNgayKetThuc() { return ngayKetThuc; }
    public void setNgayKetThuc(Date ngayKetThuc) { this.ngayKetThuc = ngayKetThuc; }
    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }
    public NhanVienYTe getNhanVienYTe() { return nhanVienYTe; }
    public void setNhanVienYTe(NhanVienYTe nhanVienYTe) { this.nhanVienYTe = nhanVienYTe; }
    public List<HoSoTiemChung> getHoSoTiemChungList() { return hoSoTiemChungList; }
    public void setHoSoTiemChungList(List<HoSoTiemChung> hoSoTiemChungList) { this.hoSoTiemChungList = hoSoTiemChungList; }
} 