package com.schoolhealth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileStorageService {
    
    @Value("${file.upload-dir:uploads/images}")
    private String uploadDir;
    
    /**
     * Lưu ảnh Base64 vào thư mục và trả về đường dẫn
     */
    public String saveBase64Image(String base64Image, String prefix) throws IOException {
        // Kiểm tra base64Image
        if (base64Image == null || base64Image.isEmpty()) {
            return null;
        }
        
        // Tạo thư mục nếu chưa tồn tại
        Path directory = Paths.get(uploadDir);
        if (!Files.exists(directory)) {
            Files.createDirectories(directory);
        }
        
        // Tạo tên file duy nhất
        String fileName = prefix + "_" + UUID.randomUUID().toString() + ".jpg";
        Path filePath = directory.resolve(fileName);
        
        // Xử lý chuỗi base64 (loại bỏ header nếu có)
        String imageData = base64Image;
        if (base64Image.contains(",")) {
            imageData = base64Image.split(",")[1];
        }
        
        // Lưu file
        byte[] imageBytes = Base64.getDecoder().decode(imageData);
        Files.write(filePath, imageBytes);
        
        // Trả về đường dẫn tương đối để lưu vào DB
        return "/api/files/" + fileName;
    }
}