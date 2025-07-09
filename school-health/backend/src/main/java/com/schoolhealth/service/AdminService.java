package com.schoolhealth.service;

import com.schoolhealth.dto.NguoiDungThongKeDTO;
import com.schoolhealth.entity.*;
import com.schoolhealth.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired private HocSinhRepository hocSinhRepo;
    @Autowired private PhuHuynhRepository phuHuynhRepo;
    @Autowired private NhanVienYTeRepository nhanVienYTeRepo;
    @Autowired private QuanLyNhaTruongRepository quanLyRepo;
    @Autowired private QuanTriVienRepository quanTriRepo;

    public List<NguoiDungThongKeDTO> layTatCaTaiKhoan() {
        List<NguoiDungThongKeDTO> list = new ArrayList<>();

        hocSinhRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getMaHocSinh(), u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        phuHuynhRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getMaPhuHuynh(), u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        nhanVienYTeRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getMaNhanVienYTe(), u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        quanLyRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getMaQuanLyNhaTruong(), u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        quanTriRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getMaQuanTriVien(), u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        return list;
    }

    public void xoaNguoiDungBangTenDangNhap(String tenDangNhap, String role) {
        switch (role) {
            case "HOC_SINH":
                HocSinh hs = hocSinhRepo.findByTenDangNhap(tenDangNhap);
                if (hs != null) hocSinhRepo.delete(hs);
                break;
            case "PHU_HUYNH":
                PhuHuynh ph = phuHuynhRepo.findByTenDangNhap(tenDangNhap);
                if (ph != null) phuHuynhRepo.delete(ph);
                break;
            case "NHAN_VIEN_Y_TE":
                NhanVienYTe nv = nhanVienYTeRepo.findByTenDangNhap(tenDangNhap);
                if (nv != null) nhanVienYTeRepo.delete(nv);
                break;
            case "QUAN_LY_NHA_TRUONG":
                QuanLyNhaTruong ql = quanLyRepo.findByTenDangNhap(tenDangNhap);
                if (ql != null) quanLyRepo.delete(ql);
                break;
            case "QUAN_TRI_VIEN":
                QuanTriVien qt = quanTriRepo.findByTenDangNhap(tenDangNhap);
                if (qt != null) quanTriRepo.delete(qt);
                break;
            default:
                throw new RuntimeException("Vai trò không hợp lệ");
        }
    }
}
