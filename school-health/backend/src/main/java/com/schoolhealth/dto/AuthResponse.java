package com.schoolhealth.dto;

public class AuthResponse {
    private String token;
    private String vaiTro;
    private String hoTen;
    private String message;
    private boolean success;
    private String maHocSinh; // ✅ Thêm trường này

    public AuthResponse() {}

    public AuthResponse(String token, String vaiTro, String hoTen, String message, boolean success) {
        this.token = token;
        this.vaiTro = vaiTro;
        this.hoTen = hoTen;
        this.message = message;
        this.success = success;
    }

    // ✅ Constructor đầy đủ để set cả maHocSinh nếu có
    public AuthResponse(String token, String vaiTro, String hoTen, String message, boolean success, String maHocSinh) {
        this(token, vaiTro, hoTen, message, success);
        this.maHocSinh = maHocSinh;
    }

    // Getters & Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getVaiTro() {
        return vaiTro;
    }

    public void setVaiTro(String vaiTro) {
        this.vaiTro = vaiTro;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMaHocSinh() {
        return maHocSinh;
    }

    public void setMaHocSinh(String maHocSinh) {
        this.maHocSinh = maHocSinh;
    }
}
