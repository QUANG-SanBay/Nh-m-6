package com.schoolhealth.service;

import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.schoolhealth.dto.AuthResponse;
import com.schoolhealth.dto.LoginRequest;
import com.schoolhealth.dto.RegisterRequest;
import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.NhanVienYTe;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.entity.QuanLyNhaTruong;
import com.schoolhealth.entity.QuanTriVien;
import com.schoolhealth.repository.HoSoSucKhoeHocSinhRepository;
import com.schoolhealth.repository.HocSinhRepository;
import com.schoolhealth.repository.NhanVienYTeRepository;
import com.schoolhealth.repository.PhuHuynhRepository;
import com.schoolhealth.repository.QuanLyNhaTruongRepository;
import com.schoolhealth.repository.QuanTriVienRepository;

@Service
public class AuthService {

    @Autowired private HocSinhRepository hocSinhRepository;
    @Autowired private PhuHuynhRepository phuHuynhRepository;
    @Autowired private NhanVienYTeRepository nhanVienYTeRepository;
    @Autowired private QuanLyNhaTruongRepository quanLyNhaTruongRepository;
    @Autowired private QuanTriVienRepository quanTriVienRepository;
    @Autowired private HoSoSucKhoeHocSinhRepository hoSoSucKhoeRepository;

    @Autowired private HocSinhService hocSinhService;
    @Autowired private PhuHuynhService phuHuynhService;
    @Autowired private NhanVienYTeService nhanVienYTeService;
    @Autowired private QuanLyNhaTruongService quanLyNhaTruongService;
    @Autowired private QuanTriVienService quanTriVienService;

    public AuthResponse login(LoginRequest request) {
        String tenDangNhap = request.getTenDangNhap();
        String matKhau = request.getMatKhau();

        // Học sinh
        HocSinh hs = hocSinhRepository.findByTenDangNhap(tenDangNhap);
        if (hs != null && hs.getMatKhauHash().equals(matKhau)) {
            return createResponse("HOC_SINH", hs.getHoTen(), hs.getMaHocSinh());
        }

        // Phụ huynh
        PhuHuynh ph = phuHuynhRepository.findByTenDangNhap(tenDangNhap);
        if (ph != null && ph.getMatKhauHash().equals(matKhau)) {
            return createResponse("PHU_HUYNH", ph.getHoTen(), null);
        }

        // Nhân viên y tế
        NhanVienYTe nv = nhanVienYTeRepository.findByTenDangNhap(tenDangNhap);
        if (nv != null && nv.getMatKhauHash().equals(matKhau)) {
            return createResponse("NHAN_VIEN_Y_TE", nv.getHoTen(), null);
        }

        // Quản lý nhà trường
        QuanLyNhaTruong ql = quanLyNhaTruongRepository.findByTenDangNhap(tenDangNhap);
        if (ql != null && ql.getMatKhauHash().equals(matKhau)) {
            return createResponse("QUAN_LY_NHA_TRUONG", ql.getHoTen(), null);
        }

        // Quản trị viên
        QuanTriVien qt = quanTriVienRepository.findByTenDangNhap(tenDangNhap);
        if (qt != null && qt.getMatKhauHash().equals(matKhau)) {
            return createResponse("QUAN_TRI_VIEN", qt.getHoTen(), null);
        }

        return new AuthResponse(null, null, null, "Tên đăng nhập hoặc mật khẩu không đúng", false);
    }

    public AuthResponse register(RegisterRequest request) {
        String tenDangNhap = request.getTenDangNhap();

        // Kiểm tra tên đăng nhập đã tồn tại
        if (isUsernameExists(tenDangNhap)) {
            return new AuthResponse(null, null, null, "Tên đăng nhập đã tồn tại", false);
        }

        String vaiTro = request.getVaiTro();
        String token = "token-" + UUID.randomUUID();

        try {
            switch (vaiTro) {
                case "HOC_SINH":
                    HocSinh hs = new HocSinh();
                    hs.setTenDangNhap(tenDangNhap);
                    hs.setMatKhauHash(request.getMatKhau());
                    hs.setEmail(request.getEmail());
                    hs.setSoDienThoai(request.getSoDienThoai());
                    hs.setVaiTro(vaiTro);
                    hs.setHoTen(request.getHoTen());
                    hs.setMaHocSinh(hocSinhService.generateMaHocSinh());

                    hocSinhService.save(hs);

                    // Tạo hồ sơ sức khỏe mặc định cho học sinh mới
                    HoSoSucKhoeHocSinh hoSo = new HoSoSucKhoeHocSinh();
                    hoSo.setHocSinh(hs); // Gán đối tượng HocSinh
                    hoSo.setNgayCapNhatCuoi(new Date());
                    hoSoSucKhoeRepository.save(hoSo);

                    return new AuthResponse(token, vaiTro, hs.getHoTen(), "Đăng ký thành công", true, hs.getMaHocSinh());

                case "PHU_HUYNH":
                    PhuHuynh ph = new PhuHuynh();
                    ph.setTenDangNhap(tenDangNhap);
                    ph.setMatKhauHash(request.getMatKhau());
                    ph.setEmail(request.getEmail());
                    ph.setSoDienThoai(request.getSoDienThoai());
                    ph.setVaiTro(vaiTro);
                    ph.setHoTen(request.getHoTen());
                    phuHuynhService.save(ph);

                    return new AuthResponse(token, vaiTro, ph.getHoTen(), "Đăng ký thành công", true);

                case "NHAN_VIEN_Y_TE":
                    NhanVienYTe nv = new NhanVienYTe();
                    nv.setTenDangNhap(tenDangNhap);
                    nv.setMatKhauHash(request.getMatKhau());
                    nv.setEmail(request.getEmail());
                    nv.setSoDienThoai(request.getSoDienThoai());
                    nv.setVaiTro(vaiTro);
                    nv.setHoTen(request.getHoTen());
                    nhanVienYTeService.save(nv);

                    return new AuthResponse(token, vaiTro, nv.getHoTen(), "Đăng ký thành công", true);

                case "QUAN_LY_NHA_TRUONG":
                    QuanLyNhaTruong ql = new QuanLyNhaTruong();
                    ql.setTenDangNhap(tenDangNhap);
                    ql.setMatKhauHash(request.getMatKhau());
                    ql.setEmail(request.getEmail());
                    ql.setSoDienThoai(request.getSoDienThoai());
                    ql.setVaiTro(vaiTro);
                    ql.setHoTen(request.getHoTen());
                    quanLyNhaTruongService.save(ql);

                    return new AuthResponse(token, vaiTro, ql.getHoTen(), "Đăng ký thành công", true);

                case "QUAN_TRI_VIEN":
                    QuanTriVien qt = new QuanTriVien();
                    qt.setTenDangNhap(tenDangNhap);
                    qt.setMatKhauHash(request.getMatKhau());
                    qt.setEmail(request.getEmail());
                    qt.setSoDienThoai(request.getSoDienThoai());
                    qt.setVaiTro(vaiTro);
                    qt.setHoTen(request.getHoTen());
                    quanTriVienService.save(qt);

                    return new AuthResponse(token, vaiTro, qt.getHoTen(), "Đăng ký thành công", true);

                default:
                    return new AuthResponse(null, null, null, "Vai trò không hợp lệ", false);
            }

        } catch (Exception e) {
            return new AuthResponse(null, null, null, "Có lỗi xảy ra khi đăng ký: " + e.getMessage(), false);
        }
    }

    private boolean isUsernameExists(String username) {
        return hocSinhRepository.findByTenDangNhap(username) != null ||
               phuHuynhRepository.findByTenDangNhap(username) != null ||
               nhanVienYTeRepository.findByTenDangNhap(username) != null ||
               quanLyNhaTruongRepository.findByTenDangNhap(username) != null ||
               quanTriVienRepository.findByTenDangNhap(username) != null;
    }

    private AuthResponse createResponse(String vaiTro, String hoTen, String maHocSinh) {
        AuthResponse res = new AuthResponse();
        res.setToken("token-" + UUID.randomUUID());
        res.setVaiTro(vaiTro);
        res.setHoTen(hoTen);
        res.setSuccess(true);
        res.setMessage("Đăng nhập thành công");

        if ("HOC_SINH".equalsIgnoreCase(vaiTro)) {
            res.setMaHocSinh(maHocSinh);
        }

        return res;
    }
}
