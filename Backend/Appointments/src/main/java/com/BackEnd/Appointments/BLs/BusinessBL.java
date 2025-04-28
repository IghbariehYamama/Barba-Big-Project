package com.BackEnd.Appointments.BLs;

import com.BackEnd.Appointments.DAOs.*;
import com.BackEnd.Appointments.Entities.*;
import com.BackEnd.Appointments.Enums.BookingStatus;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@Service
public class BusinessBL {
    @Autowired
    private BusinessDAO businessDAO;
    @Autowired
    @Lazy
    private ServiceBL serviceBL;
    @Autowired
    private BaseBookingDAO baseBookingDAO;
    @Autowired
    private BookingDAO bookingDAO;
    @Autowired
    private EmployeeServiceDAO employeeServiceDAO;
    @Autowired
    private AvailableSlotDAO availableSlotDAO;

    public List<Business> getAllBusiness() {
        return this.businessDAO.findAll();
    }
    public Business getBusinessById(int id) {
        return this.businessDAO.findById(id);
    }
    public Business getBusinessByName(String name) {
        return this.businessDAO.findByName(name);
    }
    public Business updateBusiness(Business business) {
        return this.businessDAO.save(business);
    }
    public void deleteBusiness(int id) {
        this.businessDAO.deleteById(id);
    }
    public Business addBusiness(Business business) {
        return this.businessDAO.save(business);
    }
    public List<BaseBooking> getAllBusinessBookings(Business business){
        return this.baseBookingDAO.findBookingsByBusinessId(business.getId());
    }
    public List<BaseBooking> getAllBusinessAndEmployeeBookings(Business business, Employee employee){
        return this.baseBookingDAO.findBookingsByBusinessIdAndEmployeeId(business.getId(), employee.getId());
    }
    public boolean isBookingAvailable(BaseBooking booking) {
        EmployeeService employeeService = this.employeeServiceDAO.findByEmployeeAndService(booking.getEmployee(), booking.getService())
                .orElseThrow(() -> new RuntimeException("Employee does not offer this service"));

        int duration = employeeService.getDuration();
        LocalDateTime startTime = booking.getChosenBookingTime();
        LocalDateTime endTime = startTime.plusMinutes(duration); // 🔥 Perform time calculation in Java

        return !baseBookingDAO.isBookingOverlapping(booking.getEmployee(), booking.getService(), startTime, endTime);
    }
    public List<BaseBooking> getAllAvailableBusinessBookings(Integer businessId){
        return baseBookingDAO.findBookingsByBusinessIdAndStatus(businessId, BookingStatus.UPCOMING);
    }
    public List<AvailableSlot> getAllBusinessAvailableSlotsForMonth(Integer businessId, YearMonth month) {
        LocalDate today = LocalDate.now();
        LocalDate startDate = month.equals(YearMonth.from(today)) ? today : month.atDay(1);
        LocalDate endDateExclusive = month.plusMonths(1).atDay(1);

        return availableSlotDAO.findByBusinessIdAndSlotBetween(
                businessId,
                startDate.atStartOfDay(),
                endDateExclusive.atStartOfDay()
        );
    }





}
