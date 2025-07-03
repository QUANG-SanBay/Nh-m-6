package com.schoolhealth.util;

import org.springframework.stereotype.Component;
import java.util.Base64;

@Component
public class ImageUtils {
    
    public String cleanBase64String(String base64Image) {
        if (base64Image == null || base64Image.isEmpty()) {
            return null;
        }
        
        // Nếu chuỗi base64 bắt đầu với "data:image/..." thì loại bỏ phần header này
        if (base64Image.contains(",")) {
            return base64Image.split(",")[1];
        }
        
        return base64Image;
    }
    
    public boolean isValidBase64Image(String base64Image) {
        if (base64Image == null || base64Image.isEmpty()) {
            return false;
        }
        
        try {
            // Nếu có header, loại bỏ trước khi kiểm tra
            String imageData = base64Image;
            if (base64Image.contains(",")) {
                imageData = base64Image.split(",")[1];
            }
            
            Base64.getDecoder().decode(imageData);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}