package com.BackEnd.Appointments.Entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="name")
    private String name;
    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
    @OneToMany(mappedBy = "service", fetch = FetchType.EAGER)
    private List<Appointment> appointmentsList;
}
