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
public class BusinessesController {
    @Autowired
    private BusinessService businessService;
    @Autowired
    private ServiceManager serviceManager;

    @GetMapping("/{id}")
    public BusinessCardDTO getBusiness(@PathVariable Integer id) {
        Business business = this.businessService.getBusinessById(id);
        return new BusinessCardDTO(business);
    }
    @GetMapping("{id}/services")
    public List<ServiceGetDTO> getAllBusinessServices(@PathVariable Integer id) {
        List<Service> services = serviceManager.getServicesByBusinessId(id);
        return ServiceGetDTO.toDTO(services);
    }
    @GetMapping("/{id}/slots/available/{year}/{month}")
    public ResponseEntity<List<SlotsByDateDTO>> getAvailableSlotsForMonth(
        @PathVariable int id,
        @PathVariable int year,
        @PathVariable int month) {

    YearMonth yearMonth = YearMonth.of(year, month);
    List<AvailableSlot> availableSlots = businessService.getAllBusinessAvailableSlotsForMonth(id, yearMonth);
    return ResponseEntity.ok(SlotsByDateDTO.toDTOs(availableSlots));

}

    @GetMapping("/all")
    public List<BusinessTestDTO> getAllBusinesses() {

        return BusinessTestDTO.toDTOs(businessService.getAllBusiness());
    }


    @GetMapping("/{id}/bookings/all")
    public List<AvailableBookingsDTO> getAllBusinessBooking(@PathVariable int id) {
        Business business = businessService.getBusinessById(id);
        return AvailableBookingsDTO.toDTO(businessService.getAllAvailableBusinessBookings(id));
    }
}
