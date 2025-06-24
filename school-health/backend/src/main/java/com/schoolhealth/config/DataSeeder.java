// package com.schoolhealth.school_health.config;

// import com.schoolhealth.school_health.entity.PhuHuynh;
// import com.schoolhealth.school_health.entity.NhanVienYTe;
// import com.schoolhealth.school_health.entity.HocSinh;
// import com.schoolhealth.school_health.repository.PhuHuynhRepository;
// import com.schoolhealth.school_health.repository.NhanVienYTeRepository;
// import com.schoolhealth.school_health.repository.HocSinhRepository;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.stereotype.Component;

// @Component
// public class DataSeeder implements CommandLineRunner {
//     private final PhuHuynhRepository phuHuynhRepo;
//     private final NhanVienYTeRepository nhanVienYTeRepo;
//     private final HocSinhRepository hocSinhRepo;

//     public DataSeeder(PhuHuynhRepository phuHuynhRepo, NhanVienYTeRepository nhanVienYTeRepo, HocSinhRepository hocSinhRepo) {
//         this.phuHuynhRepo = phuHuynhRepo;
//         this.nhanVienYTeRepo = nhanVienYTeRepo;
//         this.hocSinhRepo = hocSinhRepo;
//     }

//     @Override
//     public void run(String... args) {
//         // Tạo phụ huynh
//         PhuHuynh parent = new PhuHuynh();
//         parent.setMaNguoiDung("PH001");
//         parent.setTenDangNhap("parent1");
//         parent.setMatKhauHash("123456"); // nên hash mật khẩu thật
//         parent.setEmail("parent1@email.com");
//         parent.setSoDienThoai("0900000001");
//         parent.setVaiTro("PHU_HUYNH");
//         phuHuynhRepo.save(parent);

//         // Tạo y tá
//         NhanVienYTe nurse = new NhanVienYTe();
//         nurse.setMaNguoiDung("YT001");
//         nurse.setTenDangNhap("nurse1");
//         nurse.setMatKhauHash("123456");
//         nurse.setEmail("nurse1@email.com");
//         nurse.setSoDienThoai("0900000002");
//         nurse.setVaiTro("NHAN_VIEN_Y_TE");
//         nhanVienYTeRepo.save(nurse);

//         // Tạo học sinh
//         HocSinh student = new HocSinh();
//         student.setMaNguoiDung("HS001");
//         student.setTenDangNhap("student1");
//         student.setMatKhauHash("123456");
//         student.setEmail("student1@email.com");
//         student.setSoDienThoai("0900000003");
//         student.setVaiTro("HOC_SINH");
//         student.setMaHocSinh("HS001");
//         student.setHoTen("Nguyen Van A");
//         student.setLop("1A");
//         student.setGioiTinh("Nam");
//         student.setPhuHuynh(parent);
//         hocSinhRepo.save(student);
//     }
// }