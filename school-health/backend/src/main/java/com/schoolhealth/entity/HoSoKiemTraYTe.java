package com.schoolhealth.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "ho_so_kiem_tra_y_te")
public class HoSoKiemTraYTe {
    @Id
    private String maHoSo;
    @Temporal(TemporalType.DATE)
    private Date ngayKiemTra;
    private String chieuCao;
    private String canNang;
    private String ketQuaThiLuc;
    private String ketQuaThinhLuc;
    private String ketQuaRangMieng;
    private String ketQuaKhac;
    private String khuyenNghi;
    private Boolean lichHenTuVan;

    @ManyToOne
    @JoinColumn(name = "ma_chien_dich", referencedColumnName = "maChienDich")
    private ChienDichKiemTraYTe chienDichKiemTraYTe;

    @ManyToOne
    @JoinColumn(name = "ma_hoc_sinh", referencedColumnName = "maHocSinh")
    private HocSinh hocSinh;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien_y_te", referencedColumnName = "maNhanVienYTe")
    private NhanVienYTe nhanVienYTe;

    public String getMaHoSo() { return maHoSo; }
    public void setMaHoSo(String maHoSo) { this.maHoSo = maHoSo; }
    public Date getNgayKiemTra() { return ngayKiemTra; }
    public void setNgayKiemTra(Date ngayKiemTra) { this.ngayKiemTra = ngayKiemTra; }
    public String getChieuCao() { return chieuCao; }
    public void setChieuCao(String chieuCao) { this.chieuCao = chieuCao; }
    public String getCanNang() { return canNang; }
    public void setCanNang(String canNang) { this.canNang = canNang; }
    public String getKetQuaThiLuc() { return ketQuaThiLuc; }
    public void setKetQuaThiLuc(String ketQuaThiLuc) { this.ketQuaThiLuc = ketQuaThiLuc; }
    public String getKetQuaThinhLuc() { return ketQuaThinhLuc; }
    public void setKetQuaThinhLuc(String ketQuaThinhLuc) { this.ketQuaThinhLuc = ketQuaThinhLuc; }
    public String getKetQuaRangMieng() { return ketQuaRangMieng; }
    public void setKetQuaRangMieng(String ketQuaRangMieng) { this.ketQuaRangMieng = ketQuaRangMieng; }
    public String getKetQuaKhac() { return ketQuaKhac; }
    public void setKetQuaKhac(String ketQuaKhac) { this.ketQuaKhac = ketQuaKhac; }
    public String getKhuyenNghi() { return khuyenNghi; }
    public void setKhuyenNghi(String khuyenNghi) { this.khuyenNghi = khuyenNghi; }
    public Boolean getLichHenTuVan() { return lichHenTuVan; }
    public void setLichHenTuVan(Boolean lichHenTuVan) { this.lichHenTuVan = lichHenTuVan; }
    public ChienDichKiemTraYTe getChienDichKiemTraYTe() { return chienDichKiemTraYTe; }
    public void setChienDichKiemTraYTe(ChienDichKiemTraYTe chienDichKiemTraYTe) { this.chienDichKiemTraYTe = chienDichKiemTraYTe; }
    public HocSinh getHocSinh() { return hocSinh; }
    public void setHocSinh(HocSinh hocSinh) { this.hocSinh = hocSinh; }
    public NhanVienYTe getNhanVienYTe() { return nhanVienYTe; }
    public void setNhanVienYTe(NhanVienYTe nhanVienYTe) { this.nhanVienYTe = nhanVienYTe; }
} 