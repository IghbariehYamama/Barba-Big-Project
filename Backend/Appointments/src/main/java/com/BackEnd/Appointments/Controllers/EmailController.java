package com.BackEnd.Appointments.Controllers;

import com.BackEnd.Appointments.Services.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String to,
                            @RequestParam String subject,
                            @RequestParam String body) {
        emailService.sendSimpleEmail(to, subject, body);
        return "Email sent!";
    }

    @PostMapping("/send/thanks")
    public String sendThanksEmail(@RequestParam String to,
                            @RequestParam String subject) throws MessagingException {
        emailService.sendEmailWithInlineImage(to, subject);
        return "Email sent!";
    }
}