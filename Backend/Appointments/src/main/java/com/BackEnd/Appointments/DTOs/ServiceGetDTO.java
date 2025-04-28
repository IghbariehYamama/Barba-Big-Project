package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.*;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class ServiceGetDTO {
    private Integer id;
    private String name;
    private Double price;
    private CategoryNameDTO category;
    private Integer duration;
    private BusinessNameDTO business;
    private List<EmployeeNameDTO> employees;

    public ServiceGetDTO() {
    }

    public ServiceGetDTO(Integer id, Double price, String name, CategoryNameDTO category, Integer duration, BusinessNameDTO business, List<EmployeeNameDTO> employees) {
        this.id = id;
        this.price = price;
        this.name = name;
        this.category = category;
        this.duration = duration;
        this.business = business;
        this.employees = employees;
    }
    public ServiceGetDTO(Service service) {
        this.id = service.getId();
        this.price = service.getPrice();
        this.name = service.getName();
        this.category = new CategoryNameDTO(service.getCategory());
        //this.duration = service.getDuration();
        this.business = new BusinessNameDTO(service.getBusiness());
        //this.employees = EmployeeNameDTO.toDTO(service.getEmployees());
    }
    public static List<ServiceGetDTO> toDTO(List<Service> services) {
        List<ServiceGetDTO> dtos = new ArrayList<>();
        for (Service service : services) {
            dtos.add(new ServiceGetDTO(service));
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public CategoryNameDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryNameDTO category) {
        this.category = category;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public BusinessNameDTO getBusiness() {
        return business;
    }

    public void setBusiness(BusinessNameDTO business) {
        this.business = business;
    }

    public List<EmployeeNameDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeNameDTO> employees) {
        this.employees = employees;
    }
}
