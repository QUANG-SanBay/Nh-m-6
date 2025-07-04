package com.schoolhealth.controller.nurse;

import com.schoolhealth.entity.SuKienYTe;
import com.schoolhealth.repository.SuKienYTeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:3000")
public class EventController {
    @Autowired
    private SuKienYTeRepository suKienYTeRepository;

    @PostMapping("")
    public ResponseEntity<?> createEvent(@RequestBody EventRequest request) {
        System.out.println("Received event request: " + request.getTitle() + ", " + request.getDate() + " " + request.getTime());
        try {
            SuKienYTe event = new SuKienYTe();
            event.setMaSuKien(UUID.randomUUID().toString());
            event.setLoaiSuKien(request.getTitle());
            event.setMoTa(request.getDescription());
            event.setDiaDiem(request.getLocation());
            event.setSoLuongThamGia(request.getParticipants());
            event.setTrangThai("upcoming"); // Mặc định là sắp diễn ra
            
            // Kết hợp date và time thành LocalDateTime
            if (request.getDate() != null && request.getTime() != null) {
                try {
                    LocalDate date = LocalDate.parse(request.getDate());
                    LocalTime time = LocalTime.parse(request.getTime());
                    LocalDateTime dateTime = LocalDateTime.of(date, time);
                    event.setThoiGianSuKien(dateTime);
                } catch (Exception e) {
                    System.out.println("Lỗi parse date/time: " + e.getMessage());
                }
            }
            
            // Map type từ frontend sang loại sự kiện
            if (request.getType() != null) {
                switch (request.getType()) {
                    case "health_check":
                        event.setLoaiSuKien("Khám sức khỏe");
                        break;
                    case "vaccination":
                        event.setLoaiSuKien("Tiêm chủng");
                        break;
                    case "consultation":
                        event.setLoaiSuKien("Tư vấn");
                        break;
                    case "emergency":
                        event.setLoaiSuKien("Khẩn cấp");
                        break;
                    default:
                        event.setLoaiSuKien(request.getTitle());
                }
            }
            
            SuKienYTe savedEvent = suKienYTeRepository.save(event);
            return ResponseEntity.ok(savedEvent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi tạo sự kiện: " + e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<List<SuKienYTe>> getAllEvents() {
        List<SuKienYTe> events = suKienYTeRepository.findAll();
        return ResponseEntity.ok(events);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEvent(@PathVariable String id, @RequestBody EventRequest request) {
        try {
            SuKienYTe existingEvent = suKienYTeRepository.findById(id).orElse(null);
            if (existingEvent == null) {
                return ResponseEntity.notFound().build();
            }
            
            existingEvent.setLoaiSuKien(request.getTitle());
            existingEvent.setMoTa(request.getDescription());
            existingEvent.setDiaDiem(request.getLocation());
            existingEvent.setSoLuongThamGia(request.getParticipants());
            
            if (request.getDate() != null && request.getTime() != null) {
                LocalDate date = LocalDate.parse(request.getDate());
                LocalTime time = LocalTime.parse(request.getTime());
                LocalDateTime dateTime = LocalDateTime.of(date, time);
                existingEvent.setThoiGianSuKien(dateTime);
            }
            
            SuKienYTe updatedEvent = suKienYTeRepository.save(existingEvent);
            return ResponseEntity.ok(updatedEvent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi cập nhật sự kiện: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable String id) {
        try {
            if (!suKienYTeRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            suKienYTeRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi xóa sự kiện: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable String id) {
        return suKienYTeRepository.findById(id)
            .map(event -> ResponseEntity.ok(event))
            .orElse(ResponseEntity.notFound().build());
    }

    // Inner class để map request từ frontend
    public static class EventRequest {
        private String title;
        private String description;
        private String date;
        private String time;
        private String location;
        private String type;
        private Integer participants;
        private String status;

        // Getters and Setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getTime() { return time; }
        public void setTime(String time) { this.time = time; }
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public Integer getParticipants() { return participants; }
        public void setParticipants(Integer participants) { this.participants = participants; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
}
