package com.schoolhealth.dto;

import java.util.Date;

public class HocSinhInfoDTO {
    private String maHocSinh;
    private String hoTen;
    private Date ngaySinh;
    private String lop;
    private String gioiTinh;
    private String diaChi;
    private String maPhuHuynh;
    private String tenPhuHuynh;
    
    // Thông tin sức khỏe cơ bản (nếu có)
    private String tinhTrangSucKhoe;
    private Date ngayKiemTraCuoi;
    private boolean coHoSoSucKhoe;
    
    // Constructors
    public HocSinhInfoDTO() {}
    
    public HocSinhInfoDTO(String maHocSinh, String hoTen, Date ngaySinh, 
                         String lop, String gioiTinh, String diaChi) {
        this.maHocSinh = maHocSinh;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.lop = lop;
        this.gioiTinh = gioiTinh;
        this.diaChi = diaChi;
    }
    
    // Getters and Setters
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
    
    public String getMaPhuHuynh() { return maPhuHuynh; }
    public void setMaPhuHuynh(String maPhuHuynh) { this.maPhuHuynh = maPhuHuynh; }
    
    public String getTenPhuHuynh() { return tenPhuHuynh; }
    public void setTenPhuHuynh(String tenPhuHuynh) { this.tenPhuHuynh = tenPhuHuynh; }
    
    public String getTinhTrangSucKhoe() { return tinhTrangSucKhoe; }
    public void setTinhTrangSucKhoe(String tinhTrangSucKhoe) { this.tinhTrangSucKhoe = tinhTrangSucKhoe; }
    
    public Date getNgayKiemTraCuoi() { return ngayKiemTraCuoi; }
    public void setNgayKiemTraCuoi(Date ngayKiemTraCuoi) { this.ngayKiemTraCuoi = ngayKiemTraCuoi; }
    
    public boolean isCoHoSoSucKhoe() { return coHoSoSucKhoe; }
    public void setCoHoSoSucKhoe(boolean coHoSoSucKhoe) { this.coHoSoSucKhoe = coHoSoSucKhoe; }
}
