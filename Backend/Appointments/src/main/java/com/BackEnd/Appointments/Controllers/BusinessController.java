package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.BLs.BusinessBL;
import com.BackEnd.Appointments.BLs.ServiceBL;
import com.BackEnd.Appointments.DAOs.ServiceDAO;
import com.BackEnd.Appointments.DTOs.*;
import com.BackEnd.Appointments.Entities.*;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@RestController
@RequestMapping("/businesses")
@Validated
public class BusinessController {
    @Autowired
    private BusinessBL businessBL;
    @Autowired
    private ServiceBL serviceBL;

//    @GetMapping("/get/all")
//    public List<BusinessGetDTO> getAllBusinesses() {
//        List<Business> businesses = this.businessBL.getAllBusiness();
//        return BusinessGetDTO.toDTOs(businesses);
//    }
    @GetMapping("/get/all")
    public List<BusinessTestDTO> getAllBusinesses() {
        List<Business> businesses = this.businessBL.getAllBusiness();
        return BusinessTestDTO.toDTOs(businesses);
    }

    @GetMapping("/get/{id}")
    public BusinessCardDTO getBusiness(@PathVariable Integer id) {
        Business business = this.businessBL.getBusinessById(id);
        return new BusinessCardDTO(business);
    }
    @GetMapping("/services/get/all/{id}")
    public List<ServiceGetDTO> getAllBusinessServices(@PathVariable Integer id) {
        List<Service> services = serviceBL.getServicesByBusinessId(id);
        return ServiceGetDTO.toDTO(services);
    }
@GetMapping("/business/{businessId}/available/slots/month/{year}/{month}")
public ResponseEntity<List<SlotsByDateDTO>> getAvailableSlotsForMonth(
        @PathVariable int businessId,
        @PathVariable int year,
        @PathVariable int month) {

    YearMonth yearMonth = YearMonth.of(year, month);
    List<AvailableSlot> availableSlots = businessBL.getAllBusinessAvailableSlotsForMonth(businessId, yearMonth);
    return ResponseEntity.ok(SlotsByDateDTO.toDTOs(availableSlots));

}
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

    @GetMapping("/photos/{businessId}")
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
    @GetMapping("/photos/{businessId}/sliders/urls")
    public ResponseEntity<List<String>> getSliderImageUrls(
            @PathVariable Long businessId,
            HttpServletRequest request) {

        Path sliderDir = Paths.get("uploads/businesses/" + businessId + "/sliders");

        try (Stream<Path> files = Files.list(sliderDir)) {

            List<String> urls = files
                    .filter(Files::isRegularFile)
                    .map(p -> "/businesses/photos/" + businessId + "/sliders/" + p.getFileName().toString())
                    .toList();

            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/photos/{businessId}/sliders/{filename}")
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
    @GetMapping("/photos/{businessId}/employees/{employeeId}")
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


    //@GetMapping("/photos/{businessId}")
//public ResponseEntity<byte[]> getBusinessImage(@PathVariable int businessId) {
//    Path imagePath = Paths.get("images/businesses/" + businessId + "/profile/profile.jpeg");
//    return getImageResponse(imagePath);
//}
    @GetMapping("/all")
    public List<BusinessTestDTO> getAllSalons() {
        return BusinessTestDTO.toDTOs(businessBL.getAllBusiness());
    }


    @GetMapping("business/{id}/bookings/all")
    public List<AvailableBookingsDTO> getAllBusinessBooking(@PathVariable int id) {
        Business business = businessBL.getBusinessById(id);
        return AvailableBookingsDTO.toDTO(businessBL.getAllAvailableBusinessBookings(id));
    }


    @GetMapping("/photos/{businessId}/gallery/urls")
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
    @GetMapping("/photos/{businessId}/gallery/{filename}")
    public ResponseEntity<byte[]> getGalleryImage(
            @PathVariable Long businessId,
            @PathVariable String filename) {

        Path imagePath = Paths.get("uploads/businesses/" + businessId + "/gallery", filename);
        return getImageResponse(imagePath); // your existing method
    }



    //        String json = """
//            [
//                {
//                    "id": "2",
//                    "name": "Pretty Parlor",
//                    "category": "Manicure",
//                    "location": "New York, Runway, 123",
//                    "distance": "3.8 km",
//                    "rating": "4.9",
//                    "image": "manicure2",
//                    "categoryId": "4"
//                },
//                {
//                    "id": "6",
//                    "name": "Zen Retreat",
//                    "category": "Massage",
//                    "location": "Tokyo, Sakura Street, 456",
//                    "distance": "3.5 km",
//                    "rating": "4.9",
//                    "image": "massage2",
//                    "categoryId": "5"
//                },
//                {
//                    "id": "1",
//                    "name": "Belle Curls",
//                    "category": "Haircut",
//                    "location": "0093 Novic Parkway",
//                    "distance": "1.2 km",
//                    "rating": "4.5",
//                    "image": "haircut1",
//                    "categoryId": "2"
//                },
//                {
//                    "id": "8",
//                    "name": "Pedicure Palace",
//                    "category": "Make up",
//                    "location": "Dubai, Sheikh Zayed Road, 321",
//                    "distance": "6.2 km",
//                    "rating": "4.8",
//                    "image": "makeup3",
//                    "categoryId": "3"
//                },
//                {
//                    "id": "7",
//                    "name": "Gentleman's Grooming",
//                    "category": "Haircut",
//                    "location": "Sydney, Bondi Beach, 789",
//                    "distance": "2.8 km",
//                    "rating": "4.6",
//                    "image": "haircut4",
//                    "categoryId": "2"
//                },
//                {
//                    "id": "9",
//                    "name": "Relaxation Station",
//                    "category": "Massage",
//                    "location": "Rio de Janeiro, Copacabana, 456",
//                    "distance": "3.9 km",
//                    "rating": "4.7",
//                    "image": "massage5",
//                    "categoryId": "5"
//                },
//                {
//                    "id": "3",
//                    "name": "Mia Bella",
//                    "category": "Massage",
//                    "location": "London, Street City, 123",
//                    "distance": "2.3 km",
//                    "rating": "4.8",
//                    "image": "massage1",
//                    "categoryId": "5"
//                },
//                {
//                    "id": "4",
//                    "name": "Glamour Spa",
//                    "category": "Make up",
//                    "location": "Paris, Avenue de la Beauté, 45",
//                    "distance": "5.5 km",
//                    "rating": "4.7",
//                    "image": "makeup7",
//                    "categoryId": "3"
//                },
//                {
//                    "id": "5",
//                    "name": "Nail Nirvana",
//                    "category": "Manicure",
//                    "location": "Los Angeles, Sunset Boulevard, 789",
//                    "distance": "4.1 km",
//                    "rating": "4.6",
//                    "image": "manicure3",
//                    "categoryId": "4"
//                },
//                {
//                    "id": "10",
//                    "name": "yamama",
//                    "category": "Manicure",
//                    "location": "Umm El Fahem, Ein Ibrahim, 789",
//                    "distance": "4.1 km",
//                    "rating": "4.6",
//                    "image": "manicure3",
//                    "categoryId": "4"
//                }
//            ]
//        """;
//
//            return ResponseEntity.ok(json);

}
