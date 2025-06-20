package com.schoolhealth.school_health.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Hoặc "/*" nếu bạn không dùng tiền tố
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*");
    }
}
