package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.Services.BusinessService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

@RestController
   @RequestMapping("/images")
   public class ImageController {

    @Autowired
    private BusinessService businessService;

    @PostMapping(value = "/upload/profile/{businessId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadBusinessProfile(@PathVariable Long businessId,
                                                        @RequestParam("file") MultipartFile file) {
        try {
            String ext = FilenameUtils.getExtension(file.getOriginalFilename()); // optional, use Apache Commons
            String fileName = "profile." + ext; // or just use .jpeg

            String rootPath = new File(".").getCanonicalPath(); // this gives you the project root
            Path uploadPath = Paths.get(rootPath, "uploads", "businesses", businessId + "", "profile");
            Files.createDirectories(uploadPath);

            Path fullPath = uploadPath.resolve(fileName);
            file.transferTo(fullPath.toFile());

            return ResponseEntity.ok("Profile photo uploaded");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }


    private ResponseEntity<byte[]> getImageResponse(Path path) {
        try {
            byte[] imageBytes = Files.readAllBytes(path);
            String contentType = Files.probeContentType(path);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.parseMediaType(contentType));
            headers.setContentLength(imageBytes.length);

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/profile/{businessId}")
    public ResponseEntity<byte[]> getBusinessImage(@PathVariable Long businessId) {
        Path profileDir = Paths.get("uploads/businesses/"+ businessId+ "/profile");

        try {
            return Files.list(profileDir)
                    .filter(Files::isRegularFile)
                    .filter(p -> p.getFileName().toString().startsWith("profile."))
                    .findFirst()
                    .map(this::getImageResponse)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/{businessId}/sliders/urls")
    public ResponseEntity<List<String>> getSliderImageUrls(
            @PathVariable Long businessId,
            HttpServletRequest request) {

        Path sliderDir = Paths.get("uploads/businesses/" + businessId + "/sliders");

        try (Stream<Path> files = Files.list(sliderDir)) {

            List<String> urls = files
                    .filter(Files::isRegularFile)
                    .map(p -> "/images/" + businessId + "/sliders/" + p.getFileName().toString())
                    .toList();

            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("{businessId}/sliders/{filename}")
    public ResponseEntity<byte[]> getSliderImage(
            @PathVariable Long businessId,
            @PathVariable String filename) {

        Path imagePath = Paths.get("uploads/businesses/" + businessId + "/sliders", filename);
        return getImageResponse(imagePath); // your existing method
    }

    @PostMapping(value = "/upload/employee/{businessId}/{employeeId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadEmployeePhoto(
            @PathVariable Long businessId,
            @PathVariable Long employeeId,
            @RequestParam("file") MultipartFile file) {

        try {
            String ext = FilenameUtils.getExtension(file.getOriginalFilename());
            String fileName = employeeId + "." + ext;

            String rootPath = new File(".").getCanonicalPath(); // project root
            Path uploadPath = Paths.get(rootPath, "uploads", "businesses", businessId + "", "employees");
            Files.createDirectories(uploadPath);

            Path fullPath = uploadPath.resolve(fileName);
            file.transferTo(fullPath.toFile());

            return ResponseEntity.ok("Employee photo uploaded");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
        }
    }
    @GetMapping("/{businessId}/employees/{employeeId}")
    public ResponseEntity<byte[]> getEmployeePhoto(
            @PathVariable Long businessId,
            @PathVariable Long employeeId) {

        Path employeeDir = Paths.get("uploads/businesses/" + businessId + "/employees");

        try (Stream<Path> files = Files.list(employeeDir)) {
            return files
                    .filter(Files::isRegularFile)
                    .filter(p -> p.getFileName().toString().startsWith(employeeId + "."))
                    .findFirst()
                    .map(this::getImageResponse)
                    .orElse(ResponseEntity.notFound().build());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/businesses/{businessId}/gallery/urls")
    public ResponseEntity<List<String>> getGalleryImageUrls(
            @PathVariable Long businessId,
            HttpServletRequest request) {

        Path galleryDir = Paths.get("uploads/businesses/" + businessId + "/gallery");

        try (Stream<Path> files = Files.list(galleryDir)) {

            List<String> urls = files
                    .filter(Files::isRegularFile)
                    .map(p -> "/businesses/photos/" + businessId + "/gallery/" + p.getFileName().toString())
                    .toList();
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/businesses/{businessId}/gallery/{filename}")
    public ResponseEntity<byte[]> getGalleryImage(
            @PathVariable Long businessId,
            @PathVariable String filename) {

        Path imagePath = Paths.get("uploads/businesses/" + businessId + "/gallery", filename);
        return getImageResponse(imagePath); // your existing method
    }

}