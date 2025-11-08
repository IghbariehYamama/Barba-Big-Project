package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.Config.JwtService;
import com.BackEnd.Appointments.Entities.EmployeeService;
import com.BackEnd.Appointments.Services.BusinessService;
import com.BackEnd.Appointments.Services.CustomerService;
import com.BackEnd.Appointments.Repositories.*;
import com.BackEnd.Appointments.DTOs.*;
import com.BackEnd.Appointments.Entities.Booking;
import com.BackEnd.Appointments.Entities.Customer;
import com.BackEnd.Appointments.Enums.BookingStatus;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import com.BackEnd.Appointments.Exceptions.CustomerNotFoundException;
import com.BackEnd.Appointments.Exceptions.PasswordNotMatchException;
import com.BackEnd.Appointments.Services.ServiceManager;
import com.BackEnd.Appointments.Utils.PasswordUtils;
import com.BackEnd.Appointments.Utils.VerificationCode;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/customers")
@Validated
public class CustomersController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private JwtService jwtService;
    //GET

    @GetMapping("/{id}")
    public ResponseEntity<CustomerGetDTO> getCustomerById(@PathVariable Integer id) throws CustomerNotFoundException {
        Customer customer = this.customerService.getCustomerByID(id);
        CustomerGetDTO customerDTO = new CustomerGetDTO(customer);
        return ResponseEntity.ok(customerDTO);
    }
    @PostMapping("/exist/phone")
    public ResponseEntity<Boolean> notExist(@RequestBody String phoneNumber) {
            if(!customerService.existsCustomerByPhone(phoneNumber)) {
                String code = VerificationCode.generateCode(phoneNumber);
                System.out.println("Your verification code is: " + code);
                // Assume sendSMS is a method that sends the SMS
                //sendSMS(phoneNumber, "Your verification code is: " + code);
                //return ResponseEntity.ok("Verification code sent.");
                return ResponseEntity.ok(false);
            }
            else
                return ResponseEntity.ok(true);
    }
    @GetMapping("{email}/{password}")
    public ResponseEntity<CustomerGetDTO> SignInByEmail(@PathVariable String email ,@PathVariable String password) throws CustomerNotFoundException, PasswordNotMatchException {
        Customer customer = this.customerService.getCustomerByEmail(email);
        if(!PasswordUtils.verifyPassword(password, customer.getPassword())) {
            throw new PasswordNotMatchException();
        }
        CustomerGetDTO customerDTO = new CustomerGetDTO(customer);
        return ResponseEntity.ok(customerDTO);
    }
    @PostMapping("/login/phone")
    public ResponseEntity<String> signInByPhone(@RequestBody String phoneNumber) throws CustomerNotFoundException {
        if(!customerService.existsCustomerByPhone(phoneNumber)) {
            throw new CustomerNotFoundException();
        }
        String code = VerificationCode.generateCode(phoneNumber);
        System.out.println("Your verification code is: "+ code);
        // Assume sendSMS is a method that sends the SMS
        //sendSMS(phoneNumber, "Your verification code is: " + code);
        return ResponseEntity.ok("Verification code sent.");
    }

    // AuthController.java (snippet)
    @PostMapping("/verify/phone")
    public ResponseEntity<AuthResponse> verifySignInByPhone(
            @RequestBody PhoneVerificationDTO phoneVerificationDTO) throws CustomerNotFoundException {

        Customer customer = this.customerService.getCustomerByPhone(phoneVerificationDTO.getPhoneNumber());
        ResponseEntity<String> verify = verifyCode(phoneVerificationDTO);

        if (verify.getStatusCode() != HttpStatus.OK) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Build user DTO for the response
        UserGetDTO userDTO = new UserGetDTO(customer);

        // Build JWT claims (add anything you’ll need on other APIs)
        Map<String, Object> claims = Map.of(
                "uid", customer.getId(),
                "phone", customer.getPhone(),
                "name", customer.getName(),
                "roles", "USER" // e.g., ["USER"] — ensure it’s serializable
        );

        // Subject can be user id or phone; prefer a stable unique id
        String subject = String.valueOf(customer.getId());
        String token = jwtService.generateToken(subject, claims);

        return ResponseEntity.ok(new AuthResponse(token, userDTO));
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyCode(@RequestBody PhoneVerificationDTO phoneVerificationDTO) {
        boolean isValid = VerificationCode.verifyCode(phoneVerificationDTO.getPhoneNumber(), phoneVerificationDTO.getCode());
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired code.");
        }

        // Handle successful login, e.g., generate JWT
        return ResponseEntity.ok("Code verified successfully!");
    }
    @GetMapping("/{id}/bookings")
    public List<BookingGetDTO> getAllCustomerBookings(@PathVariable Integer id) {
        List<Booking> bookings = this.customerService.getAllCustomerBookings(id);
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
        customer = this.customerService.addCustomer(customer);
        return ResponseEntity.ok(customer.getId());
    }
    @PutMapping("/update")
    public ResponseEntity<UserGetDTO> updateCustomer(@RequestBody  @Valid UserGetDTO userDTO) throws CustomerAlreadyExistException, CustomerNotFoundException {
        Customer customer = this.customerService.getCustomerByID(userDTO.getId());
        this.customerService.updateCustomer(customer);
        return ResponseEntity.ok(userDTO);
    }


    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Integer id) throws CustomerNotFoundException {
        this.customerService.deleteCustomer(id);
        return ResponseEntity.ok("Customer with ID " + id + " has been deleted successfully.");
    }
}
