package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Entities.Customer;

import java.util.ArrayList;
import java.util.List;

public class CustomerNameDTO {
    private Integer id;
    private String name;

    public CustomerNameDTO() {
    }

    public CustomerNameDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public CustomerNameDTO(Customer customer) {
        this.id = customer.getId();
        this.name = customer.getName();
    }
    public static List<CustomerNameDTO> toDTO(List<Customer> customerList) {
        List<CustomerNameDTO> customerNameDTOList = new ArrayList<>();
        for (Customer customer : customerList) {
            customerNameDTOList.add(new CustomerNameDTO(customer.getId(), customer.getName()));
        }
        return customerNameDTOList;
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
