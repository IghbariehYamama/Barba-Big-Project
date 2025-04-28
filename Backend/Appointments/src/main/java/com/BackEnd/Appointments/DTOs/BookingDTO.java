package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Enums.BookingStatus;

import java.util.ArrayList;
import java.util.List;

// BookingDTO.java
public class BookingDTO {
    private Integer businessId;
    private Integer serviceId;
    private Integer customerId;
    private Integer employeeId;
    private int hour;
    private int minute;
    private int day;
    private int month;
    private int year;

    public BookingDTO() {
    }

    public BookingDTO(Integer businessId, Integer serviceId, Integer customerId, Integer employeeId, int hour, int minute, int day, int month, int year) {
        this.businessId = businessId;
        this.serviceId = serviceId;
        this.customerId = customerId;
        this.employeeId = employeeId;
        this.hour = hour;
        this.minute = minute;
        this.day = day;
        this.month = month;
        this.year = year;
    }

    public BookingDTO(Booking booking) {
        this.businessId = booking.getBusiness().getId();
        this.serviceId = booking.getService().getId();
        this.customerId = booking.getCustomer().getId();
        this.employeeId = booking.getEmployee().getId();
        this.hour = booking.getChosenBookingTime().getHour();
        this.minute = booking.getChosenBookingTime().getMinute();
        this.day = booking.getChosenBookingTime().getDayOfMonth();
        this.month = booking.getChosenBookingTime().getMonthValue();
        this.year = booking.getChosenBookingTime().getYear();
    }
    public static List<BookingDTO> toDTO(List<Booking> bookings) {
        List<BookingDTO> dtos = new ArrayList<>();
        for (Booking booking : bookings) {
            dtos.add(new BookingDTO(booking));
        }
        return dtos;
    }

    public Integer getBusinessId() { return businessId; }
    public void setBusinessId(Integer businessId) { this.businessId = businessId; }

    public Integer getServiceId() { return serviceId; }
    public void setServiceId(Integer serviceId) { this.serviceId = serviceId; }

    public Integer getCustomerId() { return customerId; }
    public void setCustomerId(Integer customerId) { this.customerId = customerId; }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public int getMinute() {
        return minute;
    }

    public void setMinute(int minute) {
        this.minute = minute;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public Integer getEmployeeId() { return employeeId;
    }

    public void setEmployeeId(Integer employeeId) {
        this.employeeId = employeeId;
    }
}

