package com.BackEnd.Appointments.Repositories;

import com.BackEnd.Appointments.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Employee findEmployeeById(Integer id);
    Employee findEmployeeByEmail(String email);
    Employee findEmployeeByBusinessId(Integer businessId);
}
