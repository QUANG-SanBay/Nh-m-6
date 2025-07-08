package com.schoolhealth.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "lich_su_kham_benh")
public class LichSuKhamBenh {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime thoiGianKham;
    private String chanDoan;
    private String dieuTri;
    private String thuocDaDung;
    private String moTaTiemChung;
    private String tenVaccine;
    private String trangThai;
    private String diaDiem;
    private String bienPhapXuLy;
    private Boolean thongBaoPhuHuynh;

    @ManyToOne
    @JoinColumn(name = "ma_hoc_sinh", referencedColumnName = "maHocSinh")
    private HocSinh hocSinh;

    @ManyToOne
    @JoinColumn(name = "ma_nhan_vien_y_te", referencedColumnName = "maNhanVienYTe")
    private NhanVienYTe nhanVienYTe;

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getThoiGianKham() { return thoiGianKham; }
    public void setThoiGianKham(LocalDateTime thoiGianKham) { this.thoiGianKham = thoiGianKham; }

    public String getChanDoan() { return chanDoan; }
    public void setChanDoan(String chanDoan) { this.chanDoan = chanDoan; }

    public String getDieuTri() { return dieuTri; }
    public void setDieuTri(String dieuTri) { this.dieuTri = dieuTri; }

    public String getThuocDaDung() { return thuocDaDung; }
    public void setThuocDaDung(String thuocDaDung) { this.thuocDaDung = thuocDaDung; }

    public String getMoTaTiemChung() { return moTaTiemChung; }
    public void setMoTaTiemChung(String moTaTiemChung) { this.moTaTiemChung = moTaTiemChung; }

    public String getTenVaccine() { return tenVaccine; }
    public void setTenVaccine(String tenVaccine) { this.tenVaccine = tenVaccine; }

    public String getTrangThai() { return trangThai; }
    public void setTrangThai(String trangThai) { this.trangThai = trangThai; }

    public String getDiaDiem() { return diaDiem; }
    public void setDiaDiem(String diaDiem) { this.diaDiem = diaDiem; }

    public String getBienPhapXuLy() { return bienPhapXuLy; }
    public void setBienPhapXuLy(String bienPhapXuLy) { this.bienPhapXuLy = bienPhapXuLy; }

    public Boolean getThongBaoPhuHuynh() { return thongBaoPhuHuynh; }
    public void setThongBaoPhuHuynh(Boolean thongBaoPhuHuynh) { this.thongBaoPhuHuynh = thongBaoPhuHuynh; }

    public HocSinh getHocSinh() { return hocSinh; }
    public void setHocSinh(HocSinh hocSinh) { this.hocSinh = hocSinh; }

    public NhanVienYTe getNhanVienYTe() { return nhanVienYTe; }
    public void setNhanVienYTe(NhanVienYTe nhanVienYTe) { this.nhanVienYTe = nhanVienYTe; }
}
