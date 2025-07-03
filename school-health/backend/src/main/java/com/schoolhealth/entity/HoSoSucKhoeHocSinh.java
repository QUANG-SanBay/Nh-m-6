package com.schoolhealth.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "ho_so_suc_khoe_hoc_sinh")
public class HoSoSucKhoeHocSinh {
    @Id
    private String maHoSo;
    private String diUng;
    private String benhManTinh;
    private String tienSuDieuTri;
    private String thiLuc;
    private String thinhLuc;
    private String lichSuTiemChung;
    private String ghiChu;
    private double chieuCao;  // Thêm trường chiều cao
    private double canNang;   // Thêm trường cân nặng
    private String ketQuaRangMieng; // Thêm trường kết quả răng miệng
    @Lob
    @Column(columnDefinition = "TEXT")
    private String anhHocSinh; // Thêm trường ảnh học sinh
    
    @Temporal(TemporalType.DATE)
    private Date ngayCapNhatCuoi;

    @ManyToOne
    @JoinColumn(name = "ma_hoc_sinh", referencedColumnName = "maHocSinh")
    private HocSinh hocSinh;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien_y_te", referencedColumnName = "maNhanVienYTe")
    private NhanVienYTe nhanVienYTe;

    // Constructor tạo ID mới nếu cần
    @PrePersist
    public void prePersist() {
        if (this.maHoSo == null || this.maHoSo.isEmpty()) {
            this.maHoSo = UUID.randomUUID().toString();
        }
    }

    // Getters và setters hiện có
    public String getMaHoSo() { return maHoSo; }
    public void setMaHoSo(String maHoSo) { this.maHoSo = maHoSo; }
    public String getDiUng() { return diUng; }
    public void setDiUng(String diUng) { this.diUng = diUng; }
    public String getBenhManTinh() { return benhManTinh; }
    public void setBenhManTinh(String benhManTinh) { this.benhManTinh = benhManTinh; }
    public String getTienSuDieuTri() { return tienSuDieuTri; }
    public void setTienSuDieuTri(String tienSuDieuTri) { this.tienSuDieuTri = tienSuDieuTri; }
    public String getThiLuc() { return thiLuc; }
    public void setThiLuc(String thiLuc) { this.thiLuc = thiLuc; }
    public String getThinhLuc() { return thinhLuc; }
    public void setThinhLuc(String thinhLuc) { this.thinhLuc = thinhLuc; }
    public String getLichSuTiemChung() { return lichSuTiemChung; }
    public void setLichSuTiemChung(String lichSuTiemChung) { this.lichSuTiemChung = lichSuTiemChung; }
    public String getGhiChu() { return ghiChu; }
    public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
    public Date getNgayCapNhatCuoi() { return ngayCapNhatCuoi; }
    public void setNgayCapNhatCuoi(Date ngayCapNhatCuoi) { this.ngayCapNhatCuoi = ngayCapNhatCuoi; }
    public HocSinh getHocSinh() { return hocSinh; }
    public void setHocSinh(HocSinh hocSinh) { this.hocSinh = hocSinh; }
    public NhanVienYTe getNhanVienYTe() { return nhanVienYTe; }
    public void setNhanVienYTe(NhanVienYTe nhanVienYTe) { this.nhanVienYTe = nhanVienYTe; }
    
    // Getters và setters cho các trường mới
    public double getChieuCao() { return chieuCao; }
    public void setChieuCao(double chieuCao) { this.chieuCao = chieuCao; }
    public double getCanNang() { return canNang; }
    public void setCanNang(double canNang) { this.canNang = canNang; }
    public String getKetQuaRangMieng() { return ketQuaRangMieng; }
    public void setKetQuaRangMieng(String ketQuaRangMieng) { this.ketQuaRangMieng = ketQuaRangMieng; }
    public String getAnhHocSinh() { return anhHocSinh; }
    public void setAnhHocSinh(String anhHocSinh) { this.anhHocSinh = anhHocSinh; }
}