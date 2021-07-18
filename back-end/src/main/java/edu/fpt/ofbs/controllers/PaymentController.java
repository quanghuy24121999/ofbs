package edu.fpt.ofbs.controllers;

import edu.fpt.ofbs.models.PaymentProfileDTO;
import edu.fpt.ofbs.models.payment.input.*;
import edu.fpt.ofbs.models.payment.ouput.*;
import edu.fpt.ofbs.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.gateway.Gateway;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping("/createProfile")
    public ResponseEntity<?> createProfile(@RequestBody PaymentProfileDTO profile) throws Exception {
        Gateway alepayGateway = new Gateway();
        RequestInfo input = paymentService.clonePayment(profile);
        ResponseInfo responseCreate = alepayGateway.chage(input);
        return ResponseEntity.status(HttpStatus.OK).body(responseCreate);
    }
    
    @PostMapping("/checkOrder")
    public ResponseEntity<?> checkOrder(@RequestBody String token) throws Exception {
        Gateway alepayGateway = new Gateway();
        RequestCheckOrder input = paymentService.cloneCheckOrder(token);
        ResponseCheckOrder responseCheckOrder = alepayGateway.checkOrder(input);
        return ResponseEntity.status(HttpStatus.OK).body(responseCheckOrder);
    }
}
