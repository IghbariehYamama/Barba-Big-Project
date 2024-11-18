package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import com.BackEnd.Appointments.Enums.Gender;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Name cannot be blank.")
    @Pattern(regexp = "^[A-Za-z\\s]+$", message = "Name must contain only letters and spaces.")
    private String name;
    @NotBlank(message = "Email cannot be blank.")
    @Email(message = "Email should be valid.")
    private String email;
    @NotBlank(message = "Password cannot be blank.")
    @Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters.")
    private String password;
    @NotBlank(message = "Phone number cannot be blank.")
    @Pattern(regexp = "05[0-9]{8}", message = "Phone number must start with '05' and contain 10 digits.")
    private String phone;
    @Past(message = "Date of birth must be in the past.")
    private LocalDate dateOfBirth;
    @NotNull(message = "Gender cannot be null.")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    // Constructors, Getters, and Setters
    public User() {}

    public User(String name, String email, String password, String phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public User(String name, String email, String password, String phone, LocalDate dateOfBirth, Gender gender) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}
