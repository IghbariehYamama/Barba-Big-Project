package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.BLs.CustomerBL;
import com.BackEnd.Appointments.DAOs.*;
import com.BackEnd.Appointments.DTOs.*;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Enums.BookingStatus;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import com.BackEnd.Appointments.Exceptions.PasswordNotMatchException;
import com.BackEnd.Appointments.Utils.PasswordUtils;
import com.BackEnd.Appointments.Utils.VerificationCode;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customers")
@Validated
public class CustomersController {
    @Autowired
    private CustomerBL customerBL;
    @Autowired
    private BookingDAO bookingDAO;
    @Autowired
    private CustomerDAO customerDAO;
    @Autowired
    private BusinessDAO businessDAO;
    @Autowired
    private EmployeeDAO employeeDAO;
    @Autowired
    private ServiceDAO serviceDAO;
    //GET

    @GetMapping("/get/{id}")
    public ResponseEntity<CustomerGetDTO> getCustomerById(@PathVariable Integer id) throws CustomerNotFoundException {
        Customer customer = this.customerBL.getCustomerByID(id);
        CustomerGetDTO customerDTO = new CustomerGetDTO(customer);
        return ResponseEntity.ok(customerDTO);
    }
    @PostMapping("/notExist")
    public ResponseEntity<Boolean> notExist(@RequestBody Map<String, String> request) {
        boolean res = false;

        if (request.containsKey("email")) {
            res = !customerBL.existsCustomerByEmail(request.get("email"));
        } else if (request.containsKey("phoneNumber")) {
            res = !customerBL.existsCustomerByPhone(request.get("phoneNumber"));
            String code = VerificationCode.generateCode(request.get("phoneNumber"));
            System.out.println("Your verification code is: "+ code);
            // Assume sendSMS is a method that sends the SMS
            //sendSMS(phoneNumber, "Your verification code is: " + code);
            //return ResponseEntity.ok("Verification code sent.");
        } else {
            return ResponseEntity.badRequest().build(); // Bad Request if keys are missing
        }

        return ResponseEntity.ok(res);
    }
    @GetMapping("/get/{email}/{password}")
    public ResponseEntity<CustomerGetDTO> SignInByEmail(@PathVariable String email ,@PathVariable String password) throws CustomerNotFoundException, PasswordNotMatchException {
        Customer customer = this.customerBL.getCustomerByEmail(email);
        if(!PasswordUtils.verifyPassword(password, customer.getPassword())) {
            throw new PasswordNotMatchException();
        }
        CustomerGetDTO customerDTO = new CustomerGetDTO(customer);
        return ResponseEntity.ok(customerDTO);
    }
    @PostMapping("/signIn/phone")
    public ResponseEntity<String> signInByPhone(@RequestBody Map<String, String> request) throws CustomerNotFoundException {
        String phone = request.get("phoneNumber");
        if(!customerBL.existsCustomerByPhone(phone)) {
            throw new CustomerNotFoundException();
        }
        String code = VerificationCode.generateCode(phone);
        System.out.println("Your verification code is: "+ code);
        // Assume sendSMS is a method that sends the SMS
        //sendSMS(phoneNumber, "Your verification code is: " + code);
        return ResponseEntity.ok("Verification code sent.");
    }
    @PostMapping("/signIn/phone/verify")
    public ResponseEntity<UserGetDTO> verifySignInByPhone(@RequestBody Map<String, String> request) throws CustomerNotFoundException {
        String phone = request.get("phoneNumber");
        String code = request.get("code");

        Customer customer = this.customerBL.getCustomerByPhone(phone);
        ResponseEntity<String> verify= verifyCode(Map.of("phoneNumber", phone, "code", code));
        if(verify.getStatusCode() == HttpStatus.OK) {
            UserGetDTO userDTO = new UserGetDTO(customer);
            return ResponseEntity.ok(userDTO);
        }
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");
        String code = request.get("code");

        if (phoneNumber == null || code == null || phoneNumber.isBlank() || code.isBlank()) {
            return ResponseEntity.badRequest().body("Phone number and code are required.");
        }

        boolean isValid = VerificationCode.verifyCode(phoneNumber, code);
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired code.");
        }

        // Handle successful login, e.g., generate JWT
        return ResponseEntity.ok("Code verified successfully!");
    }
    @GetMapping("/get/bookings/all/{customerId}")
    public List<BookingGetDTO> getAllCustomerBookings(@PathVariable Integer customerId) {
        List<Booking> bookings = this.customerBL.getAllCustomerBookings(customerId);
        return BookingGetDTO.toDTO(bookings);
    }


    //POST
    @PostMapping("/register")
    public ResponseEntity<Integer> addCustomer(@RequestBody  @Valid UserDTO user) throws CustomerAlreadyExistException {
        Customer customer = new Customer(user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getPhone(),
                user.getDateOfBirth(),
                user.getGender());
        customer = this.customerBL.addCustomer(customer);
        return ResponseEntity.ok(customer.getId());
    }
    @PutMapping("/update")
    public ResponseEntity<UserGetDTO> updateCustomer(@RequestBody  @Valid UserGetDTO userDTO) throws CustomerAlreadyExistException, CustomerNotFoundException {
        Customer customer = this.customerBL.getCustomerByID(userDTO.getId());
        this.customerBL.updateCustomer(customer);
        return ResponseEntity.ok(userDTO);
    }


    @PostMapping("/bookings/add")
    public BookingGetDTO addBooking(@RequestBody BookingDTO booking) {
        Booking newBooking = new Booking();
        newBooking.setCustomer(customerDAO.findById(booking.getCustomerId()).get());
        newBooking.setBusiness(businessDAO.findById(booking.getBusinessId()).get());
        newBooking.setEmployee(employeeDAO.findById(booking.getEmployeeId()).get());
        newBooking.setService(serviceDAO.findById(booking.getServiceId()).get());
        newBooking.setBookingTimestamp(LocalDateTime.now());
        newBooking.setChosenBookingTime(LocalDateTime.of(booking.getYear(),booking.getMonth(),booking.getDay(),booking.getHour(),booking.getMinute()));
        newBooking.setStatus(BookingStatus.UPCOMING);
        newBooking = this.customerBL.addBooking(newBooking);
        return new BookingGetDTO(newBooking);
    }
    @PostMapping("/bookings/status/update")
    public ResponseEntity<BookingGetDTO> updateBooking(@RequestBody BookingStatusDTO updatedBookingStatus) {
        Booking booking = bookingDAO.findById(updatedBookingStatus.getBookingId()).get();
        booking.setStatus(updatedBookingStatus.getBookingStatus());
        booking  = this.customerBL.updateBooking(booking);
        return ResponseEntity.ok(new BookingGetDTO(booking));
    }
    @PostMapping("/bookings/status/cancel")
    public ResponseEntity<String> cancelBooking(@RequestBody int bookingId) {
        Booking booking = bookingDAO.findById(bookingId);
        booking.setStatus(BookingStatus.CANCELLED);
        this.customerBL.updateBooking(booking);
        return ResponseEntity.ok("Cancelled!");
    }

    //DELETE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Integer id) throws CustomerNotFoundException {
        this.customerBL.deleteCustomer(id);
        return ResponseEntity.ok("Customer with ID " + id + " has been deleted successfully.");
    }
    @DeleteMapping("bookings/delete/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Integer id) throws CustomerNotFoundException {
        this.customerBL.deleteBooking(id);
        return ResponseEntity.ok("Booking with ID " + id + " has been deleted successfully.");
    }

}
