package com.BackEnd.Appointments.DTOs;

public class AuthResponse{
    private String token;
    private UserGetDTO customerData;

    public AuthResponse(String token, UserGetDTO user) {
        this.token = token;
        this.customerData = user;
    }

    public String getToken() { return token; }
    public UserGetDTO getCustomerData() { return customerData; }
}
