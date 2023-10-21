package online.unihub.backend.authentication.controller;

import online.unihub.backend.authentication.service.MailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/auth")
@RestController
public class AuthController {
    private final MailService mailService;


    //CONSTRUCTORS
    public AuthController(MailService mailService) {
        this.mailService = mailService;
    }


    @PostMapping("/mail")
    public ResponseEntity<Void> sendMail(@RequestParam("mail") String mail,
                                         @RequestParam("code") String code) {

        String message = "Enter this code in the registration window: " + code;
        mailService.sendMail(mail, "Verification code", message);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
