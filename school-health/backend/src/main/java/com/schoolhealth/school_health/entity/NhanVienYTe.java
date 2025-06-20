package com.schoolhealth.school_health.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "nhan_vien_y_te")
public class NhanVienYTe extends NguoiDung {
    private String maNhanVienYTe;
    private String hoTen;

    @OneToMany(mappedBy = "nhanVienYTe")
    private List<SuKienYTe> suKienYTeList;

    @OneToMany(mappedBy = "nhanVienYTe")
    private List<MucTonKho> mucTonKhoList;

    @OneToMany(mappedBy = "nhanVienYTe")
    private List<ChienDichTiemChung> chienDichTiemChungList;

    @OneToMany(mappedBy = "nhanVienYTe")
    private List<ChienDichKiemTraYTe> chienDichKiemTraYTeList;

    @OneToMany(mappedBy = "nhanVienYTe")
    private List<HoSoSucKhoeHocSinh> hoSoSucKhoeList;

    public String getMaNhanVienYTe() { return maNhanVienYTe; }
    public void setMaNhanVienYTe(String maNhanVienYTe) { this.maNhanVienYTe = maNhanVienYTe; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public List<SuKienYTe> getSuKienYTeList() { return suKienYTeList; }
    public void setSuKienYTeList(List<SuKienYTe> suKienYTeList) { this.suKienYTeList = suKienYTeList; }
    public List<MucTonKho> getMucTonKhoList() { return mucTonKhoList; }
    public void setMucTonKhoList(List<MucTonKho> mucTonKhoList) { this.mucTonKhoList = mucTonKhoList; }
    public List<ChienDichTiemChung> getChienDichTiemChungList() { return chienDichTiemChungList; }
    public void setChienDichTiemChungList(List<ChienDichTiemChung> chienDichTiemChungList) { this.chienDichTiemChungList = chienDichTiemChungList; }
    public List<ChienDichKiemTraYTe> getChienDichKiemTraYTeList() { return chienDichKiemTraYTeList; }
    public void setChienDichKiemTraYTeList(List<ChienDichKiemTraYTe> chienDichKiemTraYTeList) { this.chienDichKiemTraYTeList = chienDichKiemTraYTeList; }
    public List<HoSoSucKhoeHocSinh> getHoSoSucKhoeList() { return hoSoSucKhoeList; }
    public void setHoSoSucKhoeList(List<HoSoSucKhoeHocSinh> hoSoSucKhoeList) { this.hoSoSucKhoeList = hoSoSucKhoeList; }
} 