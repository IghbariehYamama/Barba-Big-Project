package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Business;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Entities.Employee;
import com.BackEnd.Appointments.Entities.Service;
import com.BackEnd.Appointments.Enums.BookingStatus;

import java.time.LocalDateTime;

public class BookingGetDTO {
    private Integer id;
    private BusinessNameDTO business;
    private ServiceNameDTO service;
    private CustomerNameDTO customer;
    private EmployeeNameDTO employee;
    private int hour;
    private int minute;
    private int day;
    private int month;
    private int year;
    private BookingStatus status;

    public BookingGetDTO() {
    }

    public BookingGetDTO(Integer id, BusinessNameDTO business, ServiceNameDTO service, CustomerNameDTO customer, EmployeeNameDTO employee, int hour, int minute, int day, int month, int year, BookingStatus status) {
        this.id = id;
        this.business = business;
        this.service = service;
        this.customer = customer;
        this.employee = employee;
        this.hour = hour;
        this.minute = minute;
        this.day = day;
        this.month = month;
        this.year = year;
        this.status = status;
    }
    public BookingGetDTO(Integer id, Business business, Service service, Customer customer, Employee employee, LocalDateTime chosenBookingTime, BookingStatus status) {
        this.id = id;
        this.business = new BusinessNameDTO(business.getId(), business.getName());
        this.service = new ServiceNameDTO(service.getId(),service.getName());
        this.customer = new CustomerNameDTO(customer.getId(), customer.getName());
        this.employee = new EmployeeNameDTO(employee.getId(), employee.getName());
        this.hour = chosenBookingTime.getHour();
        this.minute = chosenBookingTime.getMinute();
        this.day = chosenBookingTime.getDayOfMonth();
        this.month = chosenBookingTime.getMonthValue();
        this.year = chosenBookingTime.getYear();
        this.status = status;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BusinessNameDTO getBusiness() {
        return business;
    }

    public void setBusiness(BusinessNameDTO business) {
        this.business = business;
    }

    public ServiceNameDTO getService() {
        return service;
    }

    public void setService(ServiceNameDTO service) {
        this.service = service;
    }

    public CustomerNameDTO getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerNameDTO customer) {
        this.customer = customer;
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

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
