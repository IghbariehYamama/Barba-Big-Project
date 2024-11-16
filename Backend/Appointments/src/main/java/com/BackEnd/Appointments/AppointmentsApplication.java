package com.BackEnd.Appointments;

import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.TimeZone;

@SpringBootApplication
public class AppointmentsApplication {

	public static void main(String[] args) {
//		SpringApplication.run(AppointmentsApplication.class, args);
//		System.out.println("Appointment Application Started");
		ApplicationContext context = SpringApplication.run(AppointmentsApplication.class, args);
		SystemManager manager = context.getBean(SystemManager.class);
		manager.run();
	}
	@PostConstruct
	public void init() {
		// Set default time zone to Israel time
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Jerusalem"));
	}

}
