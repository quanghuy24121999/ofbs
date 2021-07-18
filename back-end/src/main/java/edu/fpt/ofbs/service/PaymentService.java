package edu.fpt.ofbs.service;

import java.net.URLEncoder;

import org.springframework.stereotype.Service;

import edu.fpt.ofbs.models.PaymentProfileDTO;
import edu.fpt.ofbs.models.payment.input.RequestCheckOrder;
import edu.fpt.ofbs.models.payment.input.RequestInfo;

@Service
public class PaymentService {
	public RequestCheckOrder cloneCheckOrder(String token){
        RequestCheckOrder request = new RequestCheckOrder();
        request.setFuntion("GetTransactionDetail");
        request.setVersion("3.1");
        request.setMerchant_id("65296");
        request.setMerchant_password("b75c78a828a5986ba4407908e50b4a55");
        request.setToken(token);
        return request;
    }

    public RequestInfo clonePayment(PaymentProfileDTO profile) {
        RequestInfo payment = new RequestInfo();
        try {
            payment.setFuntion("SetExpressCheckout");
            payment.setVersion("3.1");
            payment.setPayment_method(profile.getPaymentMethod());
            payment.setMerchant_id("65296");
            payment.setMerchant_password("b75c78a828a5986ba4407908e50b4a55");
            payment.setReceiver_email("quanghuy24121999@gmail.com");
            payment.setCur_code("vnd");
            payment.setBank_code(profile.getBankCode());
            payment.setOrder_code(profile.getOrderCode());
            payment.setTotal_amount(profile.getTotalAmount());
            payment.setFee_shipping("0");
            payment.setDiscount_amount("0");
            payment.setTax_amount("0");
            payment.setOrder_description(profile.getOrderDescription());
            payment.setReturn_url("http://localhost:8081/return.jsp");
            payment.setCancel_url("http://localhost:8081/cancel.jsp");
            payment.setBuyer_fullname(URLEncoder.encode(profile.getFullName(), "UTF-8"));
            payment.setBuyer_email(profile.getEmail());
            payment.setBuyer_mobile(profile.getMobile());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return payment;
    }
}
