package com.BackEnd.Appointments.DTOs;

import jakarta.validation.constraints.NotBlank;

public class PhoneVerificationDTO {

    @NotBlank(message = "Phone number is required.")
    private String phoneNumber;

    @NotBlank(message = "Code is required.")
    private String code;

    public PhoneVerificationDTO() {
    }

    public PhoneVerificationDTO(String phoneNumber, String code) {
        this.phoneNumber = phoneNumber;
        this.code = code;
    }
// Getters and setters

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
