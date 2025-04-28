package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Business;
import com.BackEnd.Appointments.Enums.GenderService;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import java.util.ArrayList;
import java.util.List;

public class BusinessCardDTO {
    private Integer id;
    private String name;
    private List<CategoryNameDTO> categories;
    private List<ServiceNameDTO> services;
    private List<EmployeeCardDTO> employees;
    private String phone;
    private String location;
    private String aboutUs;
    private String website;
    private List<WorkingHoursDTO> workingHours;
    //private GenderService genderService;
    //    private City city;
    private String googleMaps;
    private String waze;
    private String facebook;
    private String instagram;
    private String tiktok;
    private double rating;

    public BusinessCardDTO(String name, List<CategoryNameDTO> categories, List<ServiceNameDTO> services, List<EmployeeCardDTO> employees, String phone, Integer id, String location, String website, String aboutUs, List<WorkingHoursDTO> workingHours, String googleMaps, String waze, String facebook, String instagram, String tiktok, double rating) {
        this.name = name;
        this.categories = categories;
        this.services = services;
        this.employees = employees;
        this.phone = phone;
        this.id = id;
        this.location = location;
        this.website = website;
        this.aboutUs = aboutUs;
        this.workingHours = workingHours;
        this.googleMaps = googleMaps;
        this.waze = waze;
        this.facebook = facebook;
        this.instagram = instagram;
        this.tiktok = tiktok;
        this.rating = rating;
    }
    public BusinessCardDTO(Business business) {
        this.id = business.getId();
        this.name = business.getName();
        this.categories = CategoryNameDTO.toDTO(business.getCategories());
        this.services = ServiceNameDTO.toDTO(business.getServices());
        this.employees = EmployeeCardDTO.toDTO(business.getEmployees());
        this.phone = business.getPhone();
        this.location = business.getLocation();
        this.aboutUs = business.getAboutUs();
        this.website = business.getWebsite();
        this.workingHours = WorkingHoursDTO.dtos(business.getWorkingHours());
        this.googleMaps = business.getGoogleMaps();
        this.waze = business.getWaze();
        this.facebook = business.getFacebook();
        this.instagram = business.getInstagram();
        this.tiktok = business.getTiktok();
        this.rating = business.getRating();
    }
    public static List<BusinessCardDTO> toDTOs(List<Business> businesses) {
        List<BusinessCardDTO> dtos = new ArrayList<>();
        for (Business business : businesses) {
            dtos.add(new BusinessCardDTO(business));
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

    public List<CategoryNameDTO> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryNameDTO> categories) {
        this.categories = categories;
    }

    public List<ServiceNameDTO> getServices() {
        return services;
    }

    public void setServices(List<ServiceNameDTO> services) {
        this.services = services;
    }

    public List<EmployeeCardDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeCardDTO> employees) {
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

    public String getGoogleMaps() {
        return googleMaps;
    }

    public void setGoogleMaps(String googleMaps) {
        this.googleMaps = googleMaps;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getWaze() {
        return waze;
    }

    public void setWaze(String waze) {
        this.waze = waze;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getTiktok() {
        return tiktok;
    }

    public void setTiktok(String tiktok) {
        this.tiktok = tiktok;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}
