package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Business;

import java.util.ArrayList;
import java.util.List;

public class BusinessTestDTO {
    private int id;
    private String name;
    private String category;
    private String location;
    private String distance;
    private double rating;
    private int categoryId;

    public BusinessTestDTO() {
    }
    public BusinessTestDTO(Business business){
        this.id = business.getId();
        this.name = business.getName();
        this.category = business.getCategories().get(0).getName();
        this.location = business.getLocation();
        this.distance = business.getDistance();
        this.rating = business.getRating();

        this.categoryId =  business.getCategories().get(0).getId();
    }
    public BusinessTestDTO(int id, String name, String category, String location, String distance, double rating, String image, int categoryId) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.location = location;
        this.distance = distance;
        this.rating = rating;
        this.categoryId = categoryId;
    }

    public static List<BusinessTestDTO> toDTOs(List<Business> businesses){
        List<BusinessTestDTO> dtos = new ArrayList<>();
        for(Business business : businesses){
            dtos.add(new BusinessTestDTO(business));
        }
        return dtos;
    }
    // Getters and Setters

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}