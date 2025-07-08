package com.schoolhealth.controller;

import com.schoolhealth.entity.NguoiDung;
import com.schoolhealth.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private QuanTriVienRepository quanTriVienRepository;

    @Autowired
    private HocSinhRepository hocSinhRepository;

    @Autowired
    private PhuHuynhRepository phuHuynhRepository;

    @Autowired
    private NhanVienYTeRepository nhanVienYTeRepository;

    @Autowired
    private QuanLyNhaTruongRepository quanLyNhaTruongRepository;

    // Lấy người dùng theo vai trò
@GetMapping
public List<NguoiDung> getAllUsers(@RequestParam(required = false) String role) {
    if (role == null || role.isEmpty() || role.equals("ALL")) {
        List<NguoiDung> allUsers = new ArrayList<>();
        allUsers.addAll(quanTriVienRepository.findAll());
        allUsers.addAll(hocSinhRepository.findAll());
        allUsers.addAll(phuHuynhRepository.findAll());
        allUsers.addAll(nhanVienYTeRepository.findAll());
        allUsers.addAll(quanLyNhaTruongRepository.findAll());
        return allUsers;
    }

    switch (role) {
        case "HOC_SINH":
            return new ArrayList<>(hocSinhRepository.findAll());
        case "PHU_HUYNH":
            return new ArrayList<>(phuHuynhRepository.findAll());
        case "NHAN_VIEN_Y_TE":
            return new ArrayList<>(nhanVienYTeRepository.findAll());
        case "QUAN_LY_NHA_TRUONG":
            return new ArrayList<>(quanLyNhaTruongRepository.findAll());
        default:
            return new ArrayList<>(quanTriVienRepository.findAll());
    }
}

    // Xoá người dùng theo mã
    @DeleteMapping("/{id}")
public void deleteUser(@PathVariable("id") String id, @RequestParam("role") String role) {
    switch (role) {
        case "QUAN_TRI_VIEN":
            quanTriVienRepository.deleteById(id);
            break;
        case "NHAN_VIEN_Y_TE":
            nhanVienYTeRepository.deleteById(id);
            break;
        case "PHU_HUYNH":
            phuHuynhRepository.deleteById(id);
            break;
        case "HOC_SINH":
            hocSinhRepository.deleteById(id);
            break;
        case "QUAN_LY_NHA_TRUONG":
            quanLyNhaTruongRepository.deleteById(id);
            break;
        default:
            throw new IllegalArgumentException("Vai trò không hợp lệ");
    }
}

}
