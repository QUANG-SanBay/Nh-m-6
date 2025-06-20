package com.schoolhealth.school_health.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ho_so_tiem_chung")
public class HoSoTiemChung {
    @Id
    private String maHoSo;
    @Temporal(TemporalType.DATE)
    private Date ngayTiemChung;
    private String loVacXin;
    private String phanUngSauTiem;
    private Boolean dongYPhuHuynh;

    @ManyToOne
    @JoinColumn(name = "ma_chien_dich")
    private ChienDichTiemChung chienDichTiemChung;

    @ManyToOne
    @JoinColumn(name = "ma_hoc_sinh")
    private HocSinh hocSinh;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien_y_te")
    private NhanVienYTe nhanVienYTe;

    public String getMaHoSo() { return maHoSo; }
    public void setMaHoSo(String maHoSo) { this.maHoSo = maHoSo; }
    public Date getNgayTiemChung() { return ngayTiemChung; }
    public void setNgayTiemChung(Date ngayTiemChung) { this.ngayTiemChung = ngayTiemChung; }
    public String getLoVacXin() { return loVacXin; }
    public void setLoVacXin(String loVacXin) { this.loVacXin = loVacXin; }
    public String getPhanUngSauTiem() { return phanUngSauTiem; }
    public void setPhanUngSauTiem(String phanUngSauTiem) { this.phanUngSauTiem = phanUngSauTiem; }
    public Boolean getDongYPhuHuynh() { return dongYPhuHuynh; }
    public void setDongYPhuHuynh(Boolean dongYPhuHuynh) { this.dongYPhuHuynh = dongYPhuHuynh; }
    public ChienDichTiemChung getChienDichTiemChung() { return chienDichTiemChung; }
    public void setChienDichTiemChung(ChienDichTiemChung chienDichTiemChung) { this.chienDichTiemChung = chienDichTiemChung; }
    public HocSinh getHocSinh() { return hocSinh; }
    public void setHocSinh(HocSinh hocSinh) { this.hocSinh = hocSinh; }
    public NhanVienYTe getNhanVienYTe() { return nhanVienYTe; }
    public void setNhanVienYTe(NhanVienYTe nhanVienYTe) { this.nhanVienYTe = nhanVienYTe; }
} 