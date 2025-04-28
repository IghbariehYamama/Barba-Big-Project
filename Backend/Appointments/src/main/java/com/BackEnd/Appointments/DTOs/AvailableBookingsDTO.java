package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.*;
import com.BackEnd.Appointments.Enums.BookingStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class AvailableBookingsDTO {
    private ServiceNameDTO service;
    private EmployeeNameDTO employee;
    private int hour;
    private int minute;
    private int day;
    private int month;
    private int year;

    public AvailableBookingsDTO() {
    }
    public AvailableBookingsDTO(Service service, Employee employee, LocalDateTime chosenBookingTime) {
        this.service = new ServiceNameDTO(service.getId(),service.getName());
        this.employee = new EmployeeNameDTO(employee.getId(), employee.getName());
        this.hour = chosenBookingTime.getHour();
        this.minute = chosenBookingTime.getMinute();
        this.day = chosenBookingTime.getDayOfMonth();
        this.month = chosenBookingTime.getMonthValue();
        this.year = chosenBookingTime.getYear();
    }
    public AvailableBookingsDTO(BaseBooking booking) {
        this.service = new ServiceNameDTO(booking.getService());
        this.employee = new EmployeeNameDTO(booking.getEmployee());
        this.hour = booking.getChosenBookingTime().getHour();
        this.minute = booking.getChosenBookingTime().getMinute();
        this.day = booking.getChosenBookingTime().getDayOfMonth();
        this.month = booking.getChosenBookingTime().getMonthValue();
        this.year = booking.getChosenBookingTime().getYear();
    }
    public static List<AvailableBookingsDTO> toDTO(List<BaseBooking> bookings) {
        List<AvailableBookingsDTO> dtos = new ArrayList<>();
        for (BaseBooking booking : bookings) {
            dtos.add(new AvailableBookingsDTO(booking));
        }
        return dtos;
    }

    public ServiceNameDTO getService() {
        return service;
    }

    public void setService(ServiceNameDTO service) {
        this.service = service;
    }


    public EmployeeNameDTO getEmployee() {
        return employee;
    }

    public void setEmployee(EmployeeNameDTO employee) {
        this.employee = employee;
    }

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

}
