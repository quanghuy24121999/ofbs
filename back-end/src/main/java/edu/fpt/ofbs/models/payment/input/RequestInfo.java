/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.fpt.ofbs.models.payment.input;

import java.io.Serializable;

public class RequestInfo implements Serializable {
    
	private static final long serialVersionUID = 1L;
	
	private String _Funtion;
    private String _Version;
    private String _cur_code;
    private String _discount_amount;
    private String _Merchant_id;
    private String _Receiver_email;
    private String _Merchant_password;
    private String _Order_code;
    private String _Total_amount;
    private String _Payment_method;
    private String _Payment_type;
    private String _bank_code;
    private String _order_description;
    private String _fee_shipping;
    private String _tax_amount;
    private String _return_url;
    private String _cancel_url;
    private String _time_limit;
    private String _Buyer_fullname;
    private String _Buyer_email;
    private String _Buyer_mobile;

    public String getFuntion() {
        return _Funtion;
    }

    public void setFuntion(String _Funtion) {
        this._Funtion = _Funtion;
    }

    public String getVersion() {
        return _Version;
    }

    public void setVersion(String _Version) {
        this._Version = _Version;
    }

    public String getCur_code() {
        return _cur_code;
    }

    public void setCur_code(String _cur_code) {
        this._cur_code = _cur_code;
    }

    public String getDiscount_amount() {
        return _discount_amount;
    }

    public void setDiscount_amount(String _discount_amount) {
        this._discount_amount = _discount_amount;
    }

    public String getMerchant_id() {
        return _Merchant_id;
    }

    public void setMerchant_id(String _Merchant_id) {
        this._Merchant_id = _Merchant_id;
    }

    public String getReceiver_email() {
        return _Receiver_email;
    }

    public void setReceiver_email(String _Receiver_email) {
        this._Receiver_email = _Receiver_email;
    }

    public String getMerchant_password() {
        return _Merchant_password;
    }

    public void setMerchant_password(String _Merchant_password) {
        this._Merchant_password = _Merchant_password;
    }

    public String getOrder_code() {
        return _Order_code;
    }

    public void setOrder_code(String _Order_code) {
        this._Order_code = _Order_code;
    }

    public String getTotal_amount() {
        return _Total_amount;
    }

    public void setTotal_amount(String _Total_amount) {
        this._Total_amount = _Total_amount;
    }

    public String getPayment_method() {
        return _Payment_method;
    }

    public void setPayment_method(String _Payment_method) {
        this._Payment_method = _Payment_method;
    }

    public String getPayment_type() {
        return _Payment_type;
    }

    public void setPayment_type(String _Payment_type) {
        this._Payment_type = _Payment_type;
    }

    public String getBank_code() {
        return _bank_code;
    }

    public void setBank_code(String _bank_code) {
        this._bank_code = _bank_code;
    }

    public String getOrder_description() {
        return _order_description;
    }

    public void setOrder_description(String _order_description) {
        this._order_description = _order_description;
    }

    public String getFee_shipping() {
        return _fee_shipping;
    }

    public void setFee_shipping(String _fee_shipping) {
        this._fee_shipping = _fee_shipping;
    }

    public String getTax_amount() {
        return _tax_amount;
    }

    public void setTax_amount(String _tax_amount) {
        this._tax_amount = _tax_amount;
    }

    public String getReturn_url() {
        return _return_url;
    }

    public void setReturn_url(String _return_url) {
        this._return_url = _return_url;
    }

    public String getCancel_url() {
        return _cancel_url;
    }

    public void setCancel_url(String _cancel_url) {
        this._cancel_url = _cancel_url;
    }

    public String getTime_limit() {
        return _time_limit;
    }

    public void setTime_limit(String _time_limit) {
        this._time_limit = _time_limit;
    }

    public String getBuyer_fullname() {
        return _Buyer_fullname;
    }

    public void setBuyer_fullname(String _Buyer_fullname) {
        this._Buyer_fullname = _Buyer_fullname;
    }

    public String getBuyer_email() {
        return _Buyer_email;
    }

    public void setBuyer_email(String _Buyer_email) {
        this._Buyer_email = _Buyer_email;
    }

    public String getBuyer_mobile() {
        return _Buyer_mobile;
    }

    public void setBuyer_mobile(String _Buyer_mobile) {
        this._Buyer_mobile = _Buyer_mobile;
    }
}