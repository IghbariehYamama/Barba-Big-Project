package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.Services.BusinessService;
import com.BackEnd.Appointments.Services.ServiceManager;
import com.BackEnd.Appointments.DTOs.*;
import com.BackEnd.Appointments.Entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/businesses")
@Validated
public class BusinessController {
    @Autowired
    private BusinessService businessService;
    @Autowired
    private ServiceManager serviceManager;

    @GetMapping("/get/all")
    public List<BusinessTestDTO> getAllBusinesses() {
        List<Business> businesses = this.businessService.getAllBusiness();
        return BusinessTestDTO.toDTOs(businesses);
    }

    @GetMapping("/get/{id}")
    public BusinessCardDTO getBusiness(@PathVariable Integer id) {
        Business business = this.businessService.getBusinessById(id);
        return new BusinessCardDTO(business);
    }
    @GetMapping("/services/get/all/{id}")
    public List<ServiceGetDTO> getAllBusinessServices(@PathVariable Integer id) {
        List<Service> services = serviceManager.getServicesByBusinessId(id);
        return ServiceGetDTO.toDTO(services);
    }
@GetMapping("/business/{businessId}/available/slots/month/{year}/{month}")
public ResponseEntity<List<SlotsByDateDTO>> getAvailableSlotsForMonth(
        @PathVariable int businessId,
        @PathVariable int year,
        @PathVariable int month) {

    YearMonth yearMonth = YearMonth.of(year, month);
    List<AvailableSlot> availableSlots = businessService.getAllBusinessAvailableSlotsForMonth(businessId, yearMonth);
    return ResponseEntity.ok(SlotsByDateDTO.toDTOs(availableSlots));

}

    @GetMapping("/all")
    public List<BusinessTestDTO> getAllSalons() {
        return BusinessTestDTO.toDTOs(businessService.getAllBusiness());
    }


    @GetMapping("business/{id}/bookings/all")
    public List<AvailableBookingsDTO> getAllBusinessBooking(@PathVariable int id) {
        Business business = businessService.getBusinessById(id);
        return AvailableBookingsDTO.toDTO(businessService.getAllAvailableBusinessBookings(id));
    }
}
