package com.BackEnd.Appointments.Repositories;

import com.BackEnd.Appointments.Entities.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Integer> {
    //find
    Business findById(int id);
    Business findByName(String name);
    List<Business> findAll();

}
