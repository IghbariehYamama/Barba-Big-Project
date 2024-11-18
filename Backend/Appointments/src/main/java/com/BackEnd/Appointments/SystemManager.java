package com.BackEnd.Appointments;

import com.BackEnd.Appointments.BLs.CustomerBL;
import com.BackEnd.Appointments.DAOs.*;
import com.BackEnd.Appointments.Entities.*;
import com.BackEnd.Appointments.Enums.Gender;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.grammars.hql.HqlParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class SystemManager {
    @Autowired
    private BusinessDAO businessDAO;
    @Autowired
    private BookingDAO bookingDAO;
    @Autowired
    private CustomerDAO customerDAO;
    @Autowired
    private EmployeeDAO employeeDAO;
    @Autowired
    private ServiceDAO serviceDAO;
    @Autowired
    private CustomerBL customerBL;

    public void run() {

        System.out.println("Appointment System Started");

        System.out.println("Adding Business:");
        List<WorkingHours> workingHoursList = new ArrayList<>();
        LocalTime h8 = LocalTime.of(8,0);
        LocalTime h20 = LocalTime.of(20,0);
        LocalTime h14 = LocalTime.of(14,0);
        workingHoursList.add(new WorkingHours(DayOfWeek.MONDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.TUESDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.WEDNESDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.THURSDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.FRIDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.SATURDAY,h14,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.SUNDAY,h14,h20,null));
        Business business = new Business("Barba", new ArrayList<>(), new ArrayList<>(), null,
                "0549283453",
                "https://maps.app.goo.gl/kFgD1hisJ52TT7Kn8",
                "We are the best Barber Shop in the entire world.\nWe are waiting for you!\nCome Enjoy!",
                "https://docs.google.com/document/d/1z2x-9u2cNngd3kIOc2zI5ukcQ3jx-52Uf6pez2VBa_8/edit?tab=t.0#heading=h.67yjym78o7pw",
                workingHoursList);
        // Step 3: Link WorkingHours to Business
        for (WorkingHours workingHours : workingHoursList) {
            workingHours.setBusiness(business); // Set the business reference
        }
        businessDAO.save(business);

        System.out.println("Adding Employee:");
        Employee employee = new Employee("Abed",
                "amj450.abed@gmail.com",
                "123456789",
                business,
                "0549778195",
                LocalDate.of(2001,05,19),
                Gender.MALE);
        employee.setBookings(new ArrayList<>());
        employee.setServices(new ArrayList<>());
        employeeDAO.save(employee);
        business.getEmployees().add(employee);
        businessDAO.save(business);

        System.out.println("Adding Employee 1:");
        Employee employee1 = new Employee("Yamama",
                "yamamawcs@gmail.com",
                "987654321",
                business,
                "0501234567",
                LocalDate.of(2001,01,1),
                Gender.FEMALE);
        employee1.setBookings(new ArrayList<>());
        employee1.setServices(new ArrayList<>());
        employeeDAO.save(employee1);
        business.getEmployees().add(employee1);
        businessDAO.save(business);


        System.out.println(employeeDAO.findAll());

        System.out.println("Adding Customer:");
        Customer customer = new Customer("Jhon",
                "jhon@gmail.com",
                "aaaaaaaa",
                "0502345867",
                LocalDate.of(2005,12,14),
                Gender.MALE);
        try {
            customerBL.addCustomer(customer);
        } catch (CustomerAlreadyExistException e) {
            System.out.println(e.getMessage());
        }
        try {
            customerBL.addCustomer(customer);
        } catch (CustomerAlreadyExistException e) {
            System.out.println(e.getMessage());
        }
        System.out.println("Adding Service:");
        List<Employee> serviceEmployees = new ArrayList<>();
        serviceEmployees.add(employee1);
        Service service = new Service(business, "haircut", serviceEmployees, new ArrayList<>());
        serviceDAO.save(service);
        business.getServices().add(service);
        businessDAO.save(business);

        System.out.println(serviceDAO.findAll());

        System.out.println("Adding Booking:");
        Booking booking = new Booking(business,service,employee1,customer);
        booking.book(LocalDateTime.of(2024,12,16,14,30));
        bookingDAO.save(booking);

        System.out.println(customerDAO.findAll());
        System.out.println("Cancel Booking:");
        booking.cancel();
        bookingDAO.save(booking);
        System.out.println(bookingDAO.findAll());
        System.out.println("test: "+customerBL.getAllBookings(3));
//        ObjectMapper mapper = new ObjectMapper();
//        String inputJson = "{ \"id\": 1, \"business\": { \"id\": 1 }, \"service\": { \"id\": 1 }, \"customer\": { \"id\": 3 }, \"chosenBookingTime\": \"2024-11-16T14:30:00\", \"status\": \"UPCOMING\" }";
//
//        try {
//            Booking booking1 = mapper.readValue(inputJson, Booking.class);
//            System.out.println(booking1);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }


    }
}
