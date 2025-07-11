package com.schoolhealth.dto;

public class NguoiDungThongKeDTO {
    private String tenDangNhap;
    private String hoTen;
    private String email;
    private String soDienThoai;
    private String vaiTro;

    // Constructors
    public NguoiDungThongKeDTO() {}

    public NguoiDungThongKeDTO(String tenDangNhap, String hoTen, String email, String soDienThoai, String vaiTro) {
        this.tenDangNhap = tenDangNhap;
        this.hoTen = hoTen;
        this.email = email;
        this.soDienThoai = soDienThoai;
        this.vaiTro = vaiTro;
    }

    // Getter & Setter
    public String getTenDangNhap() { return tenDangNhap; }
    public void setTenDangNhap(String tenDangNhap) { this.tenDangNhap = tenDangNhap; }

    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSoDienThoai() { return soDienThoai; }
    public void setSoDienThoai(String soDienThoai) { this.soDienThoai = soDienThoai; }

    public String getVaiTro() { return vaiTro; }
    public void setVaiTro(String vaiTro) { this.vaiTro = vaiTro; }
}
