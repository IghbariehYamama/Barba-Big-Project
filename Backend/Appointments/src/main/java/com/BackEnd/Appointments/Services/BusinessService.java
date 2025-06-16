package com.BackEnd.Appointments.Services;

import com.BackEnd.Appointments.Repositories.*;
import com.BackEnd.Appointments.Entities.*;
import com.BackEnd.Appointments.Enums.BookingStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class BusinessService {
    @Autowired
    private BusinessRepository businessRepository;
    @Autowired
    @Lazy
    private ServiceManager serviceManager;
    @Autowired
    private BaseBookingRepository baseBookingRepository;
    @Autowired
    private BookingRepository bookingDAO;
    @Autowired
    private EmployeeServiceRepository employeeServiceRepository;
    @Autowired
    private AvailableSlotRepository availableSlotRepository;

    public List<Business> getAllBusiness() {
        return this.businessRepository.findAll();
    }
    public Business getBusinessById(int id) {
        return this.businessRepository.findById(id);
    }
    public Business getBusinessByName(String name) {
        return this.businessRepository.findByName(name);
    }
    public Business updateBusiness(Business business) {
        return this.businessRepository.save(business);
    }
    public void deleteBusiness(int id) {
        this.businessRepository.deleteById(id);
    }
    public Business addBusiness(Business business) {
        return this.businessRepository.save(business);
    }
    public List<BaseBooking> getAllBusinessBookings(Business business){
        return this.baseBookingRepository.findBookingsByBusinessId(business.getId());
    }
    public List<BaseBooking> getAllBusinessAndEmployeeBookings(Business business, Employee employee){
        return this.baseBookingRepository.findBookingsByBusinessIdAndEmployeeId(business.getId(), employee.getId());
    }
    public boolean isBookingAvailable(BaseBooking booking) {
        EmployeeService employeeService = this.employeeServiceRepository.findByEmployeeAndService(booking.getEmployee(), booking.getService())
                .orElseThrow(() -> new RuntimeException("Employee does not offer this service"));

        int duration = employeeService.getDuration();
        LocalDateTime startTime = booking.getChosenBookingTime();
        LocalDateTime endTime = startTime.plusMinutes(duration); // 🔥 Perform time calculation in Java

        return !baseBookingRepository.isBookingOverlapping(booking.getEmployee(), booking.getService(), startTime, endTime);
    }
    public List<BaseBooking> getAllAvailableBusinessBookings(Integer businessId){
        return baseBookingRepository.findBookingsByBusinessIdAndStatus(businessId, BookingStatus.UPCOMING);
    }
    public List<AvailableSlot> getAllBusinessAvailableSlotsForMonth(Integer businessId, YearMonth month) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = month.equals(YearMonth.from(today)) ? today : month.atDay(1);
        LocalDate endDateExclusive = month.plusMonths(1).atDay(1);

        return availableSlotRepository.findByBusinessIdAndSlotBetween(
                businessId,
                startDate.atStartOfDay(),
                endDateExclusive.atStartOfDay()
        );
    }





}
