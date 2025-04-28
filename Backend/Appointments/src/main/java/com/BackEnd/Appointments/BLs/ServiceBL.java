package com.BackEnd.Appointments.BLs;

import com.BackEnd.Appointments.DAOs.ServiceDAO;
import com.BackEnd.Appointments.Entities.Business;
import com.BackEnd.Appointments.Entities.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceBL {
    @Autowired
    private ServiceDAO serviceDAO;
    @Autowired
    @Lazy
    private BusinessBL businessBL;

    public List<Service> getAllServices() {
        return this.serviceDAO.findAll();
    }
    public Service getServiceById(int id) {
        return this.serviceDAO.findById(id);
    }
    public Service getServiceByName(String name) {
        return this.serviceDAO.findByName(name);
    }
    public Service addService(Service service) {
        return this.serviceDAO.save(service);
    }
    public Service updateService(Service service) {
        return this.serviceDAO.save(service);
    }
    public void deleteService(int id) {
        this.serviceDAO.deleteById(id);
    }
    public List<Service> getServicesByBusinessId(Integer businessId) {
        return serviceDAO.findAllByBusinessId(businessId);
    }



}
