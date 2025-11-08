package com.BackEnd.Appointments.Services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("Barba App <amj450.abed@gmail.com>");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
    public void sendEmailWithInlineImage(String to, String subject) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom("Barba Application <amj450.abed@gmail.com>");
        helper.setTo(to);
        helper.setSubject(subject);

        // HTML content
        String html = """
            <html>
              <body>
                <h2 style="color:teal;">🎉 Thanks for Booking!</h2>
                <p>Your appointment has been confirmed with Casca.</p>
                <img src='cid:thanksImage' alt='Thanks' style='width:100%; max-width:600px;'/>
              </body>
            </html>
            """;

        helper.setText(html, true);

        // Use relative path from project root
        File imageFile = new File("uploads/thanks.png");
        if (!imageFile.exists()) {
            throw new MessagingException("Image not found: " + imageFile.getAbsolutePath());
        }

        FileSystemResource image = new FileSystemResource(imageFile);
        helper.addInline("thanksImage", image);

        mailSender.send(message);
    }
}
