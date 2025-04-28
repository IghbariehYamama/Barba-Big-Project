package com.BackEnd.Appointments.DTOs;

import com.BackEnd.Appointments.Annotations.AtLeastOneField;
import com.BackEnd.Appointments.Entities.User;
import com.BackEnd.Appointments.Enums.Gender;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class UserDTO {
    @NotBlank(message = "Name cannot be blank.")
    @Pattern(
            regexp = "^([A-Za-z\\s]+|[\u0590-\u05FF\\s]+|[\u0600-\u06FF\\s]+)$",
            message = "Name must contain only letters and spaces in one language (English, Hebrew, or Arabic)."
    )
    private String name;
    @Email(message = "Email should be valid.")
    private String email;
    @NotBlank(message = "Password cannot be blank.")
    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters.")
    private String password;
    @NotBlank(message = "Phone Number cannot be blank.")
    @Pattern(regexp = "05[0-9]{8}", message = "Phone number must start with '05' and contain 10 digits.")
    private String phone;
    @Past(message = "Date of birth must be in the past.")
    private LocalDate dateOfBirth;
    @NotNull(message = "Gender cannot be null.")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    public UserDTO() {
    }

    public UserDTO(String email, String name, String password, String phone, LocalDate dateOfBirth, Gender gender) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }
    public UserDTO(User user) {
        this.email = user.getEmail();
        this.name = user.getName();
        this.password = user.getPassword();
        this.phone = user.getPhone();
        this.dateOfBirth = user.getDateOfBirth();
        this.gender = user.getGender();
    }

    public @NotBlank(message = "Name cannot be blank.") @Pattern(
            regexp = "^([A-Za-z\\s]+|[\u0590-\u05FF\\s]+|[\u0600-\u06FF\\s]+)$",
            message = "Name must contain only letters and spaces in one language (English, Hebrew, or Arabic)."
    ) String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name cannot be blank.") @Pattern(
            regexp = "^([A-Za-z\\s]+|[\u0590-\u05FF\\s]+|[\u0600-\u06FF\\s]+)$",
            message = "Name must contain only letters and spaces in one language (English, Hebrew, or Arabic)."
    ) String name) {
        this.name = name;
    }

    public @Email(message = "Email should be valid.") String getEmail() {
        return email;
    }

    public void setEmail(@Email(message = "Email should be valid.") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password cannot be blank.") @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters.") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password cannot be blank.") @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters.") String password) {
        this.password = password;
    }

    public @NotBlank(message = "Phone Number cannot be blank.") @Pattern(regexp = "05[0-9]{8}", message = "Phone number must start with '05' and contain 10 digits.") String getPhone() {
        return phone;
    }

    public void setPhone(@NotBlank(message = "Phone Number cannot be blank.") @Pattern(regexp = "05[0-9]{8}", message = "Phone number must start with '05' and contain 10 digits.") String phone) {
        this.phone = phone;
    }

    public @Past(message = "Date of birth must be in the past.") LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(@Past(message = "Date of birth must be in the past.") LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public @NotNull(message = "Gender cannot be null.") Gender getGender() {
        return gender;
    }

    public void setGender(@NotNull(message = "Gender cannot be null.") Gender gender) {
        this.gender = gender;
    }
}
