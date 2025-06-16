package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.*;

import java.util.ArrayList;
import java.util.List;

public class BusinessGetDTO {
    private Integer id;
    private String name;
    private List<CategoryNameDTO> categories;
    private List<ServiceNameDTO> services;
    private List<EmployeeNameDTO> employees;
    private String phone;
    private String location;
    private String aboutUs;
    private String website;
    private List<WorkingHoursDTO> workingHours;

    public BusinessGetDTO() {
    }

    public BusinessGetDTO(Integer id, String name, List<CategoryNameDTO> categories, List<ServiceNameDTO> services, List<EmployeeNameDTO> employees, String phone, String location, String aboutUs, String website, List<WorkingHoursDTO> workingHours) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.services = services;
        this.employees = employees;
        this.phone = phone;
        this.location = location;
        this.aboutUs = aboutUs;
        this.website = website;
        this.workingHours = workingHours;
    }
    public BusinessGetDTO(Business business) {
        this.id = business.getId();
        this.name = business.getName();
        this.categories = CategoryNameDTO.toDTO(business.getCategories());
        this.services = ServiceNameDTO.toDTO(business.getServices());
        this.employees = EmployeeNameDTO.toDTO(business.getEmployees());
        this.phone = business.getPhone();
        this.aboutUs = business.getAboutUs();
        this.website = business.getWebsite();
        this.workingHours = WorkingHoursDTO.dtos(business.getWorkingHours());
    }
    public static List<BusinessGetDTO> toDTOs(List<Business> businesses) {
        List<BusinessGetDTO> dtos = new ArrayList<>();
        for (Business business : businesses) {
            dtos.add(new BusinessGetDTO(business));
        }
        return dtos;
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

    public List<CategoryNameDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryNameDTO> categories) {
        this.categories = categories;
    }
}
