package dev.kadu.autoflex.config;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Value("${CORS_ALLOWED_ORIGINS:http://localhost:3000}")
  private String allowedOrigins;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    List<String> origins = Arrays.stream(allowedOrigins.split(","))
        .map(String::trim)
        .filter(value -> !value.isEmpty())
        .collect(Collectors.toList());

    registry.addMapping("/**")
        .allowedOrigins(origins.toArray(String[]::new))
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*");
  }
}
