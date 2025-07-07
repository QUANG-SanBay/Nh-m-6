package com.schoolhealth.controller.nurse;

import com.schoolhealth.entity.ChienDichTiemChung;
import com.schoolhealth.repository.ChienDichTiemChungRepository;
import com.schoolhealth.dto.ChienDichTiemChungRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/vaccination-batches")
public class ChienDichTiemChungController {
    @Autowired
    private ChienDichTiemChungRepository repo;

    @PostMapping("")
    public ResponseEntity<?> createBatch(@RequestBody ChienDichTiemChungRequest req) {
        ChienDichTiemChung batch = new ChienDichTiemChung();
        batch.setMaChienDich(UUID.randomUUID().toString());
        batch.setTenChienDich(req.getTenChienDich());
        batch.setLoaiVacXin(req.getLoaiVacXin());
        batch.setTrangThai(req.getTrangThai());
        batch.setDiaDiem(req.getDiaDiem());
        try {
            if (req.getNgayBatDau() != null)
                batch.setNgayBatDau(java.sql.Date.valueOf(req.getNgayBatDau()));
            if (req.getNgayKetThuc() != null)
                batch.setNgayKetThuc(java.sql.Date.valueOf(req.getNgayKetThuc()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Sai định dạng ngày!");
        }
        ChienDichTiemChung saved = repo.save(batch);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllBatches() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBatchById(@PathVariable String id) {
        return repo.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBatch(@PathVariable String id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
