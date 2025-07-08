package com.schoolhealth.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.schoolhealth.dto.HoSoSucKhoeDTO;
import com.schoolhealth.entity.HoSoSucKhoeHocSinh;
import com.schoolhealth.entity.HocSinh;
import com.schoolhealth.service.HocSinhService;
import com.schoolhealth.service.HoSoSucKhoeService;

@RestController
@RequestMapping("/api/hoso-suckhoe")
@CrossOrigin(origins = "http://localhost:3000")
public class HoSoSucKhoeController {

    @Autowired
    private HoSoSucKhoeService hoSoSucKhoeService;

    @Autowired
    private HocSinhService hocSinhService;

    @GetMapping("/hocsinh/{maHocSinh}")
    public ResponseEntity<?> getOrCreateHealthProfile(@PathVariable String maHocSinh) {
        try {
            Optional<HocSinh> hocSinhOpt = hocSinhService.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy học sinh"));
            }

            List<HoSoSucKhoeHocSinh> hoSoList = hoSoSucKhoeService.getHoSoByMaHocSinh(maHocSinh);

            if (hoSoList.isEmpty()) {
                return ResponseEntity.ok(List.of());
            } else {
                List<HoSoSucKhoeDTO> dtos = hoSoList.stream().map(HoSoSucKhoeDTO::new).collect(Collectors.toList());
                return ResponseEntity.ok(dtos);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/hocsinh/{maHocSinh}/update")
    public ResponseEntity<?> updateHoSoSucKhoeByStudentId(@PathVariable String maHocSinh, @RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            HoSoSucKhoeHocSinh updatedHoSo = hoSoSucKhoeService.updateHoSoSucKhoeByStudentId(maHocSinh, hoSoData);
            return ResponseEntity.ok(new HoSoSucKhoeDTO(updatedHoSo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/hocsinh/{maHocSinh}/for-parent")
    public ResponseEntity<?> getHoSoByMaHocSinhForParent(@PathVariable String maHocSinh) {
        try {
            Optional<HocSinh> hocSinhOpt = hocSinhService.findById(maHocSinh);
            if (!hocSinhOpt.isPresent()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Không tìm thấy học sinh"));
            }

            HocSinh hocSinh = hocSinhOpt.get();
            List<HoSoSucKhoeHocSinh> hoSoList = hoSoSucKhoeService.getHoSoByMaHocSinh(maHocSinh);

            if (hoSoList.isEmpty()) {
                HoSoSucKhoeDTO emptyHealthRecord = new HoSoSucKhoeDTO(hocSinh);
                return ResponseEntity.ok(List.of(emptyHealthRecord));
            } else {
                List<HoSoSucKhoeDTO> hoSoDTOList = hoSoList.stream()
                    .map(HoSoSucKhoeDTO::new)
                    .collect(Collectors.toList());
                return ResponseEntity.ok(hoSoDTOList);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/hocsinh/{maHocSinh}/create")
    public ResponseEntity<?> createHoSoSucKhoeForStudent(@PathVariable String maHocSinh, @RequestBody HoSoSucKhoeHocSinh hoSoData) {
        try {
            HoSoSucKhoeHocSinh createdHoSo = hoSoSucKhoeService.createHoSoSucKhoeForStudent(maHocSinh, hoSoData);
            return ResponseEntity.ok(new HoSoSucKhoeDTO(createdHoSo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/by-date")
    public ResponseEntity<?> getHoSoByDate(@RequestParam(required = false) String date) {
        try {
            List<HoSoSucKhoeHocSinh> result = hoSoSucKhoeService.getHoSoByDate(date);
            List<HoSoSucKhoeDTO> dtos = result.stream().map(HoSoSucKhoeDTO::new).collect(Collectors.toList());
            return ResponseEntity.ok(dtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
