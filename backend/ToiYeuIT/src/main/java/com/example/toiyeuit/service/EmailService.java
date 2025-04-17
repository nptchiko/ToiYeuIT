package com.example.toiyeuit.service;

import com.example.toiyeuit.exception.AppException;
import com.example.toiyeuit.exception.ErrorCode;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@AllArgsConstructor
public class EmailService {

    JavaMailSender mailSender;

    String EMAIL_HOST = "haycuoinhieuhon1412@gmail.com";

    public void sendEmail(String receiver, String body, String subject){
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

        try {
            helper.setText(body, true);
            helper.setTo(receiver);
            helper.setSubject(subject);
            helper.setFrom(EMAIL_HOST);
            mailSender.send(mimeMessage);
        } catch (MessagingException e){
            throw new AppException(ErrorCode.INVALID_EMAIL_DELIVERY);
        }
        }

}
