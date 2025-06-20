package com.schoolhealth.school_health.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "thong_bao")
public class ThongBao {
    @Id
    private String maThongBao;
    private String tieuDe;
    private String noiDung;
    private LocalDateTime thoiGianGui;
    private Boolean daDoc;
    @ManyToOne
    @JoinColumn(name = "nguoi_nhan_id")
    private PhuHuynh nguoiNhan;

    public String getMaThongBao() { return maThongBao; }
    public void setMaThongBao(String maThongBao) { this.maThongBao = maThongBao; }
    public String getTieuDe() { return tieuDe; }
    public void setTieuDe(String tieuDe) { this.tieuDe = tieuDe; }
    public String getNoiDung() { return noiDung; }
    public void setNoiDung(String noiDung) { this.noiDung = noiDung; }
    public LocalDateTime getThoiGianGui() { return thoiGianGui; }
    public void setThoiGianGui(LocalDateTime thoiGianGui) { this.thoiGianGui = thoiGianGui; }
    public Boolean getDaDoc() { return daDoc; }
    public void setDaDoc(Boolean daDoc) { this.daDoc = daDoc; }
    public PhuHuynh getNguoiNhan() { return nguoiNhan; }
    public void setNguoiNhan(PhuHuynh nguoiNhan) { this.nguoiNhan = nguoiNhan; }
} 