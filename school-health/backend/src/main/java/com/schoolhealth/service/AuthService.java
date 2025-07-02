package com.schoolhealth.service;

import com.schoolhealth.dto.AuthResponse;
import com.schoolhealth.dto.LoginRequest;
import com.schoolhealth.dto.RegisterRequest;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.entity.NhanVienYTe;
import com.schoolhealth.repository.HocSinhRepository;
import com.schoolhealth.repository.PhuHuynhRepository;
import com.schoolhealth.repository.NhanVienYTeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private HocSinhRepository hocSinhRepository;
    
    @Autowired
    private PhuHuynhRepository phuHuynhRepository;
    
    @Autowired
    private NhanVienYTeRepository nhanVienYTeRepository;

    public AuthResponse login(LoginRequest request) {
        // Kiểm tra trong bảng HocSinh
        HocSinh hocSinh = hocSinhRepository.findByTenDangNhap(request.getTenDangNhap());
        if (hocSinh != null && hocSinh.getMatKhauHash().equals(request.getMatKhau())) {
            return new AuthResponse("token-" + UUID.randomUUID(), "HOC_SINH", hocSinh.getHoTen(), "Đăng nhập thành công", true);
        }

        // Kiểm tra trong bảng PhuHuynh
        PhuHuynh phuHuynh = phuHuynhRepository.findByTenDangNhap(request.getTenDangNhap()).orElse(null);
        if (phuHuynh != null && phuHuynh.getMatKhauHash().equals(request.getMatKhau())) {
            return new AuthResponse("token-" + UUID.randomUUID(), "PHU_HUYNH", phuHuynh.getHoTen(), "Đăng nhập thành công", true);
        }

        // Kiểm tra trong bảng NhanVienYTe
        NhanVienYTe nhanVienYTe = nhanVienYTeRepository.findByTenDangNhap(request.getTenDangNhap());
        if (nhanVienYTe != null && nhanVienYTe.getMatKhauHash().equals(request.getMatKhau())) {
            return new AuthResponse("token-" + UUID.randomUUID(), "NHAN_VIEN_Y_TE", nhanVienYTe.getHoTen(), "Đăng nhập thành công", true);
        }

        return new AuthResponse(null, null, null, "Tên đăng nhập hoặc mật khẩu không đúng", false);
    }

    public AuthResponse register(RegisterRequest request) {
        // Kiểm tra tên đăng nhập đã tồn tại chưa
        if (hocSinhRepository.findByTenDangNhap(request.getTenDangNhap()) != null ||
            phuHuynhRepository.findByTenDangNhap(request.getTenDangNhap()) != null ||
            nhanVienYTeRepository.findByTenDangNhap(request.getTenDangNhap()) != null) {
            return new AuthResponse(null, null, null, "Tên đăng nhập đã tồn tại", false);
        }

        // Tạo tài khoản mới theo vai trò
        switch (request.getVaiTro()) {
            case "HOC_SINH":
                HocSinh hocSinh = new HocSinh();
                hocSinh.setTenDangNhap(request.getTenDangNhap());
                hocSinh.setMatKhauHash(request.getMatKhau());
                hocSinh.setEmail(request.getEmail());
                hocSinh.setSoDienThoai(request.getSoDienThoai());
                hocSinh.setVaiTro(request.getVaiTro());
                hocSinh.setHoTen(request.getHoTen());
                hocSinhRepository.save(hocSinh);
                return new AuthResponse("token-" + UUID.randomUUID(), "HOC_SINH", hocSinh.getHoTen(), "Đăng ký thành công", true);

            case "PHU_HUYNH":
                PhuHuynh phuHuynh = new PhuHuynh();
                phuHuynh.setTenDangNhap(request.getTenDangNhap());
                phuHuynh.setMatKhauHash(request.getMatKhau());
                phuHuynh.setEmail(request.getEmail());
                phuHuynh.setSoDienThoai(request.getSoDienThoai());
                phuHuynh.setVaiTro(request.getVaiTro());
                phuHuynh.setHoTen(request.getHoTen());
                phuHuynhRepository.save(phuHuynh);
                return new AuthResponse("token-" + UUID.randomUUID(), "PHU_HUYNH", phuHuynh.getHoTen(), "Đăng ký thành công", true);

            case "NHAN_VIEN_Y_TE":
                NhanVienYTe nhanVienYTe = new NhanVienYTe();
                nhanVienYTe.setTenDangNhap(request.getTenDangNhap());
                nhanVienYTe.setMatKhauHash(request.getMatKhau());
                nhanVienYTe.setEmail(request.getEmail());
                nhanVienYTe.setSoDienThoai(request.getSoDienThoai());
                nhanVienYTe.setVaiTro(request.getVaiTro());
                nhanVienYTe.setHoTen(request.getHoTen());
                nhanVienYTeRepository.save(nhanVienYTe);
                return new AuthResponse("token-" + UUID.randomUUID(), "NHAN_VIEN_Y_TE", nhanVienYTe.getHoTen(), "Đăng ký thành công", true);

            default:
                return new AuthResponse(null, null, null, "Vai trò không hợp lệ", false);
        }
    }
} 