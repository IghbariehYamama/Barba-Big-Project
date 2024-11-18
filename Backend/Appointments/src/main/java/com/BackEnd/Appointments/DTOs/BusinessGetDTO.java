package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.BusinessManager;
import com.BackEnd.Appointments.Entities.Employee;
import com.BackEnd.Appointments.Entities.Service;
import com.BackEnd.Appointments.Entities.WorkingHours;
import jakarta.persistence.*;

import java.util.List;

public class BusinessGetDTO {
    private Integer id;
    private String name;
    private List<ServiceNameDTO> services;
    private List<EmployeeNameDTO> employees;
    private String phone;
    private String location;
    private String aboutUs;
    private String website;
    private List<WorkingHoursDTO> workingHours;

    public BusinessGetDTO() {
    }

    public BusinessGetDTO(Integer id,String name, List<ServiceNameDTO> services, List<EmployeeNameDTO> employees, String phone, String location, String aboutUs, String website, List<WorkingHoursDTO> workingHours) {
        this.id = id;
        this.name = name;
        this.services = services;
        this.employees = employees;
        this.phone = phone;
        this.location = location;
        this.aboutUs = aboutUs;
        this.website = website;
        this.workingHours = workingHours;
    }

    public BusinessGetDTO(Integer id, String name, List<EmployeeNameDTO> employees, List<ServiceNameDTO> services) {
        this.id = id;
        this.name = name;
        this.employees = employees;
        this.services = services;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ServiceNameDTO> getServices() {
        return services;
    }

    public void setServices(List<ServiceNameDTO> services) {
        this.services = services;
    }

    public List<EmployeeNameDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeNameDTO> employees) {
        this.employees = employees;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAboutUs() {
        return aboutUs;
    }

    public void setAboutUs(String aboutUs) {
        this.aboutUs = aboutUs;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public List<WorkingHoursDTO> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(List<WorkingHoursDTO> workingHours) {
        this.workingHours = workingHours;
    }
}
