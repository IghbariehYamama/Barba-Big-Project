package com.BackEnd.Appointments.Entities;

import com.BackEnd.Appointments.Enums.Gender;
import com.BackEnd.Appointments.Utils.PasswordUtils;
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
    @Pattern(
            regexp = "^([A-Za-z\\s]+|[\u0590-\u05FF\\s]+|[\u0600-\u06FF\\s]+)$",
            message = "Name must contain only letters and spaces in one language (English, Hebrew, or Arabic)."
    )
    private String name;
    @Column(unique = true)
    @Email(message = "Email should be valid.")
    private String email;
    @NotBlank(message = "Password cannot be blank.")
    private String password;
    @Column(unique = true)
    @NotBlank(message = "Phone cannot be blank.")
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
        this.password = PasswordUtils.hashPassword(password);
        this.password = PasswordUtils.hashPassword(password);
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

    public @NotBlank(message = "Password cannot be blank.") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password cannot be blank.") String password) {
        this.password = PasswordUtils.hashPassword(password);
    }

    public @NotBlank(message = "Phone cannot be blank.") @Pattern(regexp = "05[0-9]{8}", message = "Phone number must start with '05' and contain 10 digits.") String getPhone() {
        return phone;
    }

    public void setPhone(@NotBlank(message = "Phone cannot be blank.") @Pattern(regexp = "05[0-9]{8}", message = "Phone number must start with '05' and contain 10 digits.") String phone) {
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
