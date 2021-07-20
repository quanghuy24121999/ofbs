package edu.fpt.ofbs.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import edu.fpt.ofbs.config.*;
import edu.fpt.ofbs.service.PaypalService;
import edu.fpt.ofbs.utils.Utils;

@RestController
@CrossOrigin("*")
@RequestMapping("/payment")
public class PaymentController {
	public static final String URL_PAYPAL_SUCCESS = "/payment/pay/success";
	public static final String URL_PAYPAL_CANCEL = "/payment/pay/cancel";
	public static final String URL_PAYPAL_BASE = "http://localhost:3000";
	private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private PaypalService paypalService;

	@PostMapping("/pay")
	public ResponseEntity<?> pay(HttpServletRequest request, @RequestParam("price") double price, HttpServletResponse response, @RequestParam("description") String description) throws IOException {
		String cancelUrl = Utils.getBaseURL(request) + URL_PAYPAL_CANCEL;
		String successUrl = Utils.getBaseURL(request) + URL_PAYPAL_SUCCESS;
		try {
			Payment payment = paypalService.createPayment(price, "USD", PaypalPaymentMethod.paypal,
					PaypalPaymentIntent.sale, description, cancelUrl, successUrl);
			for (Links links : payment.getLinks()) {
				if (links.getRel().equals("approval_url")) {
					return ResponseEntity.status(HttpStatus.OK).body(links.getHref());
//					response.sendRedirect(links.getHref());
				}
			}
		} catch (PayPalRESTException e) {
			log.error(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body("home");
	}

	@GetMapping("/pay/cancel")
	public void cancelPay(HttpServletRequest request, HttpServletResponse response) throws IOException {
//		return ResponseEntity.status(HttpStatus.OK).body("cancel");
		response.sendRedirect(URL_PAYPAL_BASE + "/paymentCancel");
	}

	@GetMapping("/pay/success")
	public void successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			Payment payment = paypalService.executePayment(paymentId, payerId);
			if (payment.getState().equals("approved")) {
//				return ResponseEntity.status(HttpStatus.OK).body(link.getHref());
				response.sendRedirect(URL_PAYPAL_BASE + "/paymentSuccess");
			}
		} catch (PayPalRESTException e) {
			log.error(e.getMessage());
		}
//		return ResponseEntity.status(HttpStatus.OK).body("home");
	}
}
