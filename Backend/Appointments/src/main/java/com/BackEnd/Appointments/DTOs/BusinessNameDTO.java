package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Business;

import java.util.ArrayList;
import java.util.List;

public class BusinessNameDTO {
    private Integer id;
    private String name;

    public BusinessNameDTO() {
    }

    public BusinessNameDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public BusinessNameDTO(Business business) {
        this.id = business.getId();
        this.name = business.getName();
    }
    public static List<BusinessNameDTO> toDTO(List<Business> businesses) {
        List<BusinessNameDTO> dtos = new ArrayList<BusinessNameDTO>();
        for (Business business : businesses) {
            dtos.add(new BusinessNameDTO(business));
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

    @Override
    public String toString() {
        return "BusinessNameDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
