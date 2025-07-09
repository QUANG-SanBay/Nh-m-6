package com.schoolhealth.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "quan_ly_nha_truong")
public class QuanLyNhaTruong extends NguoiDung {
    @Id
    // Loại bỏ @GeneratedValue để tránh xung đột
    private String maQuanLy;
    private String hoTen;
    private String maQuanLyNhaTruong;

    public String getMaQuanLyNhaTruong() {
        return maQuanLyNhaTruong;
     }

     public void setMaQuanLyNhaTruong(String maQuanLyNhaTruong) {
         this.maQuanLyNhaTruong = maQuanLyNhaTruong;
     }


    @OneToMany(mappedBy = "quanLyNhaTruong")
    private List<SuKienYTe> suKienYTeList;


    @OneToMany(mappedBy = "quanLyNhaTruong")
    private List<HoSoSucKhoeHocSinh> hoSoSucKhoeList;

    @PrePersist
    public void prePersist() {
        if (this.maQuanLy == null || this.maQuanLy.trim().isEmpty()) {
            System.out.println("Warning: QuanLyNhaTruong ID was not set before persist!");
        }
    }

    public String getmaQuanLy() { return maQuanLy; }
    public void setmaQuanLy(String maQuanLy) { this.maQuanLy = maQuanLy; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public List<SuKienYTe> getSuKienYTeList() { return suKienYTeList; }
    public void setSuKienYTeList(List<SuKienYTe> suKienYTeList) { this.suKienYTeList = suKienYTeList; }
    public List<HoSoSucKhoeHocSinh> getHoSoSucKhoeList() { return hoSoSucKhoeList; }
    public void setHoSoSucKhoeList(List<HoSoSucKhoeHocSinh> hoSoSucKhoeList) { this.hoSoSucKhoeList = hoSoSucKhoeList; }
}