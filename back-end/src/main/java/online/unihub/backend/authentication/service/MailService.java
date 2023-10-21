package online.unihub.backend.authentication.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class MailService {
    @Value("${spring.mail.username}")
    private String FROM;
    private final JavaMailSender gmailSender;


    //CONSTRUCTORS
    public MailService(JavaMailSender gmailSender) {
        this.gmailSender = gmailSender;
    }


    /**
     *
     */
    public void sendMail(String to,
                         String subject,
                         String body) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(FROM);
        message.setTo(to);
        message.setText(body);
        message.setSubject(subject);

        gmailSender.send(message);
    }
}
