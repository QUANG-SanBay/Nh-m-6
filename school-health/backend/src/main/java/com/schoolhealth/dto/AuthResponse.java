package com.schoolhealth.dto;

public class AuthResponse {
    private String token;
    private String vaiTro;
    private String hoTen;
    private String message;
    private boolean success;

    public AuthResponse() {}

    public AuthResponse(String token, String vaiTro, String hoTen, String message, boolean success) {
        this.token = token;
        this.vaiTro = vaiTro;
        this.hoTen = hoTen;
        this.message = message;
        this.success = success;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public String getVaiTro() { return vaiTro; }
    public void setVaiTro(String vaiTro) { this.vaiTro = vaiTro; }
    public String getHoTen() { return hoTen; }
    public void setHoTen(String hoTen) { this.hoTen = hoTen; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
} 