package com.schoolhealth.controller.nurse;

import com.schoolhealth.entity.SuKienYTe;
import com.schoolhealth.repository.SuKienYTeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/events")
public class EventController {
    @Autowired
    private SuKienYTeRepository suKienYTeRepository;

    @PostMapping("")
    public ResponseEntity<?> createEvent(@RequestBody SuKienYTe event) {
        event.setMaSuKien(UUID.randomUUID().toString());
        SuKienYTe savedEvent = suKienYTeRepository.save(event);
        return ResponseEntity.ok(savedEvent);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.ok(suKienYTeRepository.findAll());
    }
}
