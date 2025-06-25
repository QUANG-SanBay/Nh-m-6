package com.schoolhealth.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "hoc_sinh")
public class HocSinh extends NguoiDung {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String maHocSinh;
    private String hoTen;
    @Temporal(TemporalType.DATE)
    private Date ngaySinh;
    private String lop;
    private String gioiTinh;
    private String diaChi;

    @ManyToOne
    @JoinColumn(name = "ma_phu_huynh", referencedColumnName = "maPhuHuynh")
    private PhuHuynh phuHuynh;

    @OneToMany(mappedBy = "hocSinh")
    private List<HoSoSucKhoeHocSinh> hoSoSucKhoeList;

    @OneToMany(mappedBy = "hocSinh")
    private List<SuKienYTe> suKienYTeList;

    @OneToMany(mappedBy = "hocSinh")
    private List<HoSoTiemChung> hoSoTiemChungList;

    @OneToMany(mappedBy = "hocSinh")
    private List<HoSoKiemTraYTe> hoSoKiemTraYTeList;

    public String getMaHocSinh() { return maHocSinh; }
    public void setMaHocSinh(String maHocSinh) { this.maHocSinh = maHocSinh; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public Date getNgaySinh() { return ngaySinh; }
    public void setNgaySinh(Date ngaySinh) { this.ngaySinh = ngaySinh; }
    public String getLop() { return lop; }
    public void setLop(String lop) { this.lop = lop; }
    public String getGioiTinh() { return gioiTinh; }
    public void setGioiTinh(String gioiTinh) { this.gioiTinh = gioiTinh; }
    public String getDiaChi() { return diaChi; }
    public void setDiaChi(String diaChi) { this.diaChi = diaChi; }
    public PhuHuynh getPhuHuynh() { return phuHuynh; }
    public void setPhuHuynh(PhuHuynh phuHuynh) { this.phuHuynh = phuHuynh; }
    public List<HoSoSucKhoeHocSinh> getHoSoSucKhoeList() { return hoSoSucKhoeList; }
    public void setHoSoSucKhoeList(List<HoSoSucKhoeHocSinh> hoSoSucKhoeList) { this.hoSoSucKhoeList = hoSoSucKhoeList; }
    public List<SuKienYTe> getSuKienYTeList() { return suKienYTeList; }
    public void setSuKienYTeList(List<SuKienYTe> suKienYTeList) { this.suKienYTeList = suKienYTeList; }
    public List<HoSoTiemChung> getHoSoTiemChungList() { return hoSoTiemChungList; }
    public void setHoSoTiemChungList(List<HoSoTiemChung> hoSoTiemChungList) { this.hoSoTiemChungList = hoSoTiemChungList; }
    public List<HoSoKiemTraYTe> getHoSoKiemTraYTeList() { return hoSoKiemTraYTeList; }
    public void setHoSoKiemTraYTeList(List<HoSoKiemTraYTe> hoSoKiemTraYTeList) { this.hoSoKiemTraYTeList = hoSoKiemTraYTeList; }
} 