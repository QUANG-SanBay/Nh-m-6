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
            u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        phuHuynhRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        nhanVienYTeRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        quanLyRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        quanTriRepo.findAll().forEach(u -> list.add(new NguoiDungThongKeDTO(
            u.getTenDangNhap(), u.getHoTen(), u.getEmail(), u.getSoDienThoai(), u.getVaiTro()
        )));

        return list;
    }

    public void xoaNguoiDung(String username, String role) {
    switch (role) {
        case "HOC_SINH":
            hocSinhRepo.deleteByTenDangNhap(username);
            break;
        case "PHU_HUYNH":
            phuHuynhRepo.deleteByTenDangNhap(username);
            break;
        case "NHAN_VIEN_Y_TE":
            nhanVienYTeRepo.deleteByTenDangNhap(username);
            break;
        case "QUAN_LY_NHA_TRUONG":
            quanLyRepo.deleteByTenDangNhap(username);
            break;
        case "QUAN_TRI_VIEN":
            quanTriRepo.deleteByTenDangNhap(username);
            break;
        default:
            throw new RuntimeException("Vai trò không hợp lệ");
    }
}

    
}
