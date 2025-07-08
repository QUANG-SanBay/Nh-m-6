package com.schoolhealth.controller;

import com.schoolhealth.dto.NguoiDungThongKeDTO;
import com.schoolhealth.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public List<NguoiDungThongKeDTO> layTatCaNguoiDung() {
        return adminService.layTatCaTaiKhoan();
    }

    @DeleteMapping("/users/{username}")
    public void xoaNguoiDung(@PathVariable String username, @RequestParam String role) {
        adminService.xoaNguoiDung(username, role);
    }


}

