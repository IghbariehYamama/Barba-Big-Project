package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceDAO extends JpaRepository<Service, Integer> {
    Service findByName(String name);
    Service findById(int id);
    //Service findByEmployeeId(Integer employeeId);

}
