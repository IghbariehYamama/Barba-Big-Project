package com.BackEnd.Appointments.Services;

import com.BackEnd.Appointments.Repositories.BaseBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BaseBookingService {
    @Autowired
    private BaseBookingRepository baseBookingRepository;

    @Transactional
    public void deleteBooking(int id) {
        this.baseBookingRepository.deleteById(id);
    }

}
