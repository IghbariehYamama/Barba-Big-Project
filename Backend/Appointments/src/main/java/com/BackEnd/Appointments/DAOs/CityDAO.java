package com.BackEnd.Appointments.DAOs;

import com.BackEnd.Appointments.Entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityDAO extends JpaRepository<City, Integer> {
}
