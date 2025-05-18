package com.BackEnd.Appointments.Services;

import com.BackEnd.Appointments.Repositories.ServiceRepository;
import com.BackEnd.Appointments.Entities.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceManager {
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    @Lazy
    private BusinessService businessService;

    public List<Service> getAllServices() {
        return this.serviceRepository.findAll();
    }
    public Service getServiceById(int id) {
        return this.serviceRepository.findById(id);
    }
    public Service getServiceByName(String name) {
        return this.serviceRepository.findByName(name);
    }
    public Service addService(Service service) {
        return this.serviceRepository.save(service);
    }
    public Service updateService(Service service) {
        return this.serviceRepository.save(service);
    }
    public void deleteService(int id) {
        this.serviceRepository.deleteById(id);
    }
    public List<Service> getServicesByBusinessId(Integer businessId) {
        return serviceRepository.findAllByBusinessId(businessId);
    }



}
