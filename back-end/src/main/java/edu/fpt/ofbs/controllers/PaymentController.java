package edu.fpt.ofbs.controllers;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import edu.fpt.ofbs.config.*;
import edu.fpt.ofbs.entities.PaymentHistory;
import edu.fpt.ofbs.models.IPaymentHistoryDTO;
import edu.fpt.ofbs.models.ResponseMessage;
import edu.fpt.ofbs.service.PaymentHistoryService;
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
	
	@Autowired
	private PaymentHistoryService paymentHistoryService;

	@PostMapping("/pay")
	public ResponseEntity<?> pay(HttpServletRequest request, @RequestParam("price") double price,
			HttpServletResponse response, @RequestParam("description") String description) throws IOException {
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
	public void successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
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

	@GetMapping("/history")
	public ResponseEntity<?> getPaymentHistory(@RequestParam("userId") long userId,
			@RequestParam("paymentCode") String paymentCode, @RequestParam("status") String status,
			@RequestParam("fromDate") String fromDate, @RequestParam("toDate") String toDate) {
		List<IPaymentHistoryDTO> payments = paymentHistoryService.getPaymentHistory(userId, paymentCode, status, fromDate, toDate);
		
		return ResponseEntity.status(HttpStatus.OK).body(payments);
	}
	
	@PatchMapping("/updateStatus")
	public ResponseEntity<?> updateOrderStatus(@PathParam("paymentId") long paymentId, @PathParam("status") String status) {
		String message = "";

		try {
			paymentHistoryService.updatePaymentStatus(paymentId, status);

			message = "Update payment status successfully !";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not update payment status !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> save(@RequestBody PaymentHistory paymentHistory) {
		String message = "";

		try {
			PaymentHistory pHistory = paymentHistoryService.save(paymentHistory);
			
			return ResponseEntity.status(HttpStatus.OK).body(pHistory);
		} catch (Exception e) {
			message = "Could not save payment history !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@GetMapping("/getPaymentById")
	public ResponseEntity<?> findById(@PathParam("paymentId") long paymentId) throws IOException {
		PaymentHistory pHistory = paymentHistoryService.findById(paymentId);
		
		return ResponseEntity.status(HttpStatus.OK).body(pHistory);
	}
}
