package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Service;

import java.util.ArrayList;
import java.util.List;

public class ServiceNameDTO {
    private Integer id;
    private String name;

    public ServiceNameDTO() {
    }

    public ServiceNameDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public ServiceNameDTO(Service service) {
        this.id = service.getId();
        this.name = service.getName();
    }

    public static List<ServiceNameDTO> toDTO(List<Service> services) {
        List<ServiceNameDTO> dtos = new ArrayList<ServiceNameDTO>();
        for (Service service : services) {
            dtos.add(new ServiceNameDTO(service));
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
        return "ServiceNameDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
