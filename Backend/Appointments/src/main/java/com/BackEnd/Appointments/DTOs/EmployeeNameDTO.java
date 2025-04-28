package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Employee;

import java.util.ArrayList;
import java.util.List;

public class EmployeeNameDTO {
    private Integer id;
    private String name;

    public EmployeeNameDTO() {
    }

    public EmployeeNameDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public EmployeeNameDTO(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getName();
    }

    public static List<EmployeeNameDTO> toDTO(List<Employee> employees) {
        List<EmployeeNameDTO> dtos = new ArrayList<EmployeeNameDTO>();
        for (Employee employee : employees) {
            dtos.add(new EmployeeNameDTO(employee));
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
        return "EmployeeNameDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
