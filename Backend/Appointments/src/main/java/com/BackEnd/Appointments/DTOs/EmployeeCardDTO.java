package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Employee;

import java.util.ArrayList;
import java.util.List;

public class EmployeeCardDTO {
    private Integer id;
    private String name;
    private String position;
    private String phoneNumber;

    public EmployeeCardDTO() {
    }

    public EmployeeCardDTO(Integer id, String name, String position, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.phoneNumber = phoneNumber;
    }
    public EmployeeCardDTO(Employee employee) {
        this.id = employee.getId();
        this.name = employee.getName();
        this.phoneNumber = employee.getPhone();
        this.position = "Test Position";
    }

    public static List<EmployeeCardDTO> toDTO(List<Employee> employees) {
        List<EmployeeCardDTO> dtos = new ArrayList<EmployeeCardDTO>();
        for (Employee employee : employees) {
            dtos.add(new EmployeeCardDTO(employee));
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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "EmployeeCardDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", position='" + position + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
