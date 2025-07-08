package com.schoolhealth.dto;

import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import java.util.Date;

public class HoSoSucKhoeDTO {
    private String maHoSo;
    private String diUng;
    private String benhManTinh;
    private String tienSuDieuTri;
    private String thiLuc;
    private String thinhLuc;
    private String lichSuTiemChung;
    private String ghiChu;
    private double chieuCao;
    private double canNang;
    private String ketQuaRangMieng;
    private String nhomMau;
    private String tinhTrangSucKhoe;
    private String anhHocSinh;
    private Date ngayCapNhatCuoi;
    
    // Student information
    private StudentInfoDTO hocSinh;
    
    public static class StudentInfoDTO {
        private String maHocSinh;
        private String hoTen;
        private Date ngaySinh;
        private String lop;
        private String gioiTinh;
        private String diaChi;
        
        public StudentInfoDTO(HocSinh hocSinh) {
            this.maHocSinh = hocSinh.getMaHocSinh();
            this.hoTen = hocSinh.getHoTen();
            this.ngaySinh = hocSinh.getNgaySinh();
            this.lop = hocSinh.getLop();
            this.gioiTinh = hocSinh.getGioiTinh();
            this.diaChi = hocSinh.getDiaChi();
        }
        
        // Getters
        public String getMaHocSinh() { return maHocSinh; }
        public String getHoTen() { return hoTen; }
        public Date getNgaySinh() { return ngaySinh; }
        public String getLop() { return lop; }
        public String getGioiTinh() { return gioiTinh; }
        public String getDiaChi() { return diaChi; }
    }
    
    public HoSoSucKhoeDTO(HoSoSucKhoeHocSinh hoSo) {
        this.maHoSo = hoSo.getMaHoSo();
        this.diUng = hoSo.getDiUng();
        this.benhManTinh = hoSo.getBenhManTinh();
        this.tienSuDieuTri = hoSo.getTienSuDieuTri();
        this.thiLuc = hoSo.getThiLuc();
        this.thinhLuc = hoSo.getThinhLuc();
        this.lichSuTiemChung = hoSo.getLichSuTiemChung();
        this.ghiChu = hoSo.getGhiChu();
        this.chieuCao = hoSo.getChieuCao();
        this.canNang = hoSo.getCanNang();
        this.ketQuaRangMieng = hoSo.getKetQuaRangMieng();
        this.nhomMau = hoSo.getNhomMau();
        this.tinhTrangSucKhoe = hoSo.getTinhTrangSucKhoe();
        this.anhHocSinh = hoSo.getAnhHocSinh();
        this.ngayCapNhatCuoi = hoSo.getNgayCapNhatCuoi();
        
        if (hoSo.getHocSinh() != null) {
            this.hocSinh = new StudentInfoDTO(hoSo.getHocSinh());
        }
    }
    
    // Constructor cho trường hợp chưa có hồ sơ sức khỏe
    public HoSoSucKhoeDTO(HocSinh hocSinh) {
        // Khởi tạo các giá trị mặc định cho hồ sơ sức khỏe
        this.maHoSo = null;
        this.diUng = "";
        this.benhManTinh = "";
        this.tienSuDieuTri = "";
        this.thiLuc = "";
        this.thinhLuc = "";
        this.lichSuTiemChung = "";
        this.ghiChu = "";
        this.chieuCao = 0.0;
        this.canNang = 0.0;
        this.ketQuaRangMieng = "";
        this.nhomMau = "";
        this.tinhTrangSucKhoe = "";
        this.anhHocSinh = "";
        this.ngayCapNhatCuoi = null;
        
        // Gán thông tin học sinh
        this.hocSinh = new StudentInfoDTO(hocSinh);
    }
    
    // Getters
    public String getMaHoSo() { return maHoSo; }
    public String getDiUng() { return diUng; }
    public String getBenhManTinh() { return benhManTinh; }
    public String getTienSuDieuTri() { return tienSuDieuTri; }
    public String getThiLuc() { return thiLuc; }
    public String getThinhLuc() { return thinhLuc; }
    public String getLichSuTiemChung() { return lichSuTiemChung; }
    public String getGhiChu() { return ghiChu; }
    public double getChieuCao() { return chieuCao; }
    public double getCanNang() { return canNang; }
    public String getKetQuaRangMieng() { return ketQuaRangMieng; }
    public String getNhomMau() { return nhomMau; }
    public String getTinhTrangSucKhoe() { return tinhTrangSucKhoe; }
    public String getAnhHocSinh() { return anhHocSinh; }
    public Date getNgayCapNhatCuoi() { return ngayCapNhatCuoi; }
    public StudentInfoDTO getHocSinh() { return hocSinh; }
}
