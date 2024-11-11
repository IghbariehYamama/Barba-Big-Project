package com.BackEnd.Appointments.Entities;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="businesses")
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="name")
    private String name;
    @OneToMany(mappedBy = "business", fetch = FetchType.EAGER)
    private List<Service> services;
    @ManyToOne
    private BusinessManager businessManager;
}
