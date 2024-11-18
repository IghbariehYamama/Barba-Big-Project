package com.BackEnd.Appointments.DTOs;

public class CustomerNameDTO {
    private Integer id;
    private String name;

    public CustomerNameDTO() {
    }

    public CustomerNameDTO(Integer id, String name) {
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
        return "CustomerNameDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
