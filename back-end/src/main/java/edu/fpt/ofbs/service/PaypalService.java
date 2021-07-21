package edu.fpt.ofbs.service;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

import edu.fpt.ofbs.config.PaypalPaymentIntent;
import edu.fpt.ofbs.config.PaypalPaymentMethod;

public interface PaypalService {

	Payment createPayment(Double total, String currency, PaypalPaymentMethod method, PaypalPaymentIntent intent,
			String description, String cancelUrl, String successUrl) throws PayPalRESTException;

	Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;

}
