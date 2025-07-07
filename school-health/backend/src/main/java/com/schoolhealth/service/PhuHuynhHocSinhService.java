package com.schoolhealth.service;

import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.entity.PhuHuynh;
import com.schoolhealth.dto.HocSinhInfoDTO;
import com.schoolhealth.repository.HocSinhRepository;
import com.schoolhealth.repository.PhuHuynhRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.util.stream.Collectors;
import java.util.stream.Collectors;

@Service
@Transactional
public class PhuHuynhHocSinhService {
    
    @Autowired
    private HocSinhRepository hocSinhRepository;
    
    @Autowired
    private PhuHuynhRepository phuHuynhRepository;
    
    // Liên kết phụ huynh với học sinh
    public HocSinh linkPhuHuynhToHocSinh(String maHocSinh, String maPhuHuynh) {
        try {
            // Tìm học sinh
            Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh);
            }
            
            // Tìm phụ huynh
            Optional<PhuHuynh> phuHuynhOpt = phuHuynhRepository.findById(maPhuHuynh);
            if (!phuHuynhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy phụ huynh với mã: " + maPhuHuynh);
            }
            
            HocSinh hocSinh = hocSinhOpt.get();
            PhuHuynh phuHuynh = phuHuynhOpt.get();
            
            // Liên kết
            hocSinh.setPhuHuynh(phuHuynh);
            
            return hocSinhRepository.save(hocSinh);
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi liên kết phụ huynh và học sinh: " + e.getMessage());
        }
    }
    
    // Lấy danh sách học sinh của phụ huynh
    public List<HocSinh> getHocSinhByPhuHuynh(String maPhuHuynh) {
        try {
            // Validate input
            if (maPhuHuynh == null || maPhuHuynh.trim().isEmpty()) {
                throw new RuntimeException("Mã phụ huynh không được để trống");
            }
            
            // Kiểm tra phụ huynh có tồn tại không
            Optional<PhuHuynh> phuHuynhOpt = phuHuynhRepository.findById(maPhuHuynh);
            if (!phuHuynhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy phụ huynh với mã: " + maPhuHuynh);
            }
            
            // Lấy danh sách học sinh
            List<HocSinh> hocSinhList = hocSinhRepository.findByPhuHuynh_MaPhuHuynh(maPhuHuynh);
            
            // Log để debug
            System.out.println("Found " + hocSinhList.size() + " students for parent: " + maPhuHuynh);
            
            return hocSinhList;
            
        } catch (Exception e) {
            System.err.println("Error in getHocSinhByPhuHuynh: " + e.getMessage());
            throw new RuntimeException("Lỗi khi lấy danh sách học sinh: " + e.getMessage());
        }
    }
    
    // Tìm phụ huynh theo email để liên kết
    public PhuHuynh findPhuHuynhByEmail(String email) {
        return phuHuynhRepository.findByEmail(email);
    }
    
    // Hủy liên kết
    public HocSinh unlinkPhuHuynhFromHocSinh(String maHocSinh) {
        try {
            Optional<HocSinh> hocSinhOpt = hocSinhRepository.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy học sinh với mã: " + maHocSinh);
            }
            
            HocSinh hocSinh = hocSinhOpt.get();
            hocSinh.setPhuHuynh(null);
            
            return hocSinhRepository.save(hocSinh);
            
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi hủy liên kết: " + e.getMessage());
        }
    }
    
    // Lấy danh sách học sinh với thông tin chi tiết
    public List<HocSinhInfoDTO> getHocSinhInfoByPhuHuynh(String maPhuHuynh) {
        try {
            // Validate input
            if (maPhuHuynh == null || maPhuHuynh.trim().isEmpty()) {
                throw new RuntimeException("Mã phụ huynh không được để trống");
            }
            
            // Kiểm tra phụ huynh có tồn tại không
            Optional<PhuHuynh> phuHuynhOpt = phuHuynhRepository.findById(maPhuHuynh);
            if (!phuHuynhOpt.isPresent()) {
                throw new RuntimeException("Không tìm thấy phụ huynh với mã: " + maPhuHuynh);
            }
            
            PhuHuynh phuHuynh = phuHuynhOpt.get();
            
            // Lấy danh sách học sinh
            List<HocSinh> hocSinhList = hocSinhRepository.findByPhuHuynh_MaPhuHuynh(maPhuHuynh);
            
            // Convert sang DTO với thông tin chi tiết
            List<HocSinhInfoDTO> result = hocSinhList.stream().map(hocSinh -> {
                HocSinhInfoDTO dto = new HocSinhInfoDTO();
                dto.setMaHocSinh(hocSinh.getMaHocSinh());
                dto.setHoTen(hocSinh.getHoTen());
                dto.setNgaySinh(hocSinh.getNgaySinh());
                dto.setLop(hocSinh.getLop());
                dto.setGioiTinh(hocSinh.getGioiTinh());
                dto.setDiaChi(hocSinh.getDiaChi());
                dto.setMaPhuHuynh(maPhuHuynh);
                dto.setTenPhuHuynh(phuHuynh.getHoTen());
                
                // Kiểm tra có hồ sơ sức khỏe không
                if (hocSinh.getHoSoSucKhoeList() != null && !hocSinh.getHoSoSucKhoeList().isEmpty()) {
                    dto.setCoHoSoSucKhoe(true);
                    // Lấy ngày cập nhật cuối từ hồ sơ sức khỏe gần nhất
                    dto.setNgayKiemTraCuoi(
                        hocSinh.getHoSoSucKhoeList().stream()
                            .map(hs -> hs.getNgayCapNhatCuoi())
                            .filter(date -> date != null)
                            .max(Date::compareTo)
                            .orElse(null)
                    );
                } else {
                    dto.setCoHoSoSucKhoe(false);
                }
                
                return dto;
            }).collect(Collectors.toList());
            
            System.out.println("Found " + result.size() + " students info for parent: " + maPhuHuynh);
            
            return result;
            
        } catch (Exception e) {
            System.err.println("Error in getHocSinhInfoByPhuHuynh: " + e.getMessage());
            throw new RuntimeException("Lỗi khi lấy thông tin chi tiết học sinh: " + e.getMessage());
        }
    }
}