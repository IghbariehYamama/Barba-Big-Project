package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.BaseBooking;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class HoursBookedForDay {

    private Integer employeeId;
    private LocalTime bookingTime; // Format: "HH:mm"

    public HoursBookedForDay() {
    }

    public HoursBookedForDay(Integer employeeId, LocalTime bookingTime) {
        this.employeeId = employeeId;
        this.bookingTime = bookingTime;
    }
    public HoursBookedForDay(BaseBooking booking) {
        this.employeeId = booking.getEmployee().getId();
        this.bookingTime = booking.getChosenBookingTime().toLocalTime();
    }
    public static List<HoursBookedForDay> toDTO(List<BaseBooking> bookings){
        List<HoursBookedForDay> res = new ArrayList<>();
        for(BaseBooking booking : bookings){
            res.add(new HoursBookedForDay(booking));
        }
        return res;
    }

    public Integer getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }

    public LocalTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    @Override
    public String toString() {
        return "HoursBookedForDay{" +
                "employeeId=" + employeeId +
                ", bookingTime='" + bookingTime + '\'' +
                '}';
    }
}

