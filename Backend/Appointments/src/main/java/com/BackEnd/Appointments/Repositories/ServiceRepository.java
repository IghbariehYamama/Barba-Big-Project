package com.BackEnd.Appointments.Repositories;

import com.BackEnd.Appointments.Entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer> {
    Service findByName(String name);
    Service findById(int id);
    //Service findByEmployeeId(Integer employeeId);
    List<Service> findAll();
    List<Service> findAllByBusinessId(int businessId);

}
