package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.Business;
import com.BackEnd.Appointments.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessDAO extends JpaRepository<Business, Integer> {
    //find
    Business findById(int id);
    Business findByName(String name);
    List<Business> findAll();

}
