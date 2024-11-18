package com.BackEnd.Appointments.DTOs;

public class ServiceNameDTO {
    private Integer id;
    private String name;

    public ServiceNameDTO() {
    }

    public ServiceNameDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
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
