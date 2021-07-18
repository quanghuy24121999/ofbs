/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.fpt.ofbs.models.payment.input;

import java.io.Serializable;

public class RequestCheckOrder implements Serializable {
    
	private static final long serialVersionUID = 1L;
	
	private String _Funtion;
    private String _Version;
    private String _Merchant_id;
    private String _Merchant_password;
    private String _token;

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

    public String getMerchant_id() {
        return _Merchant_id;
    }

    public void setMerchant_id(String _Merchant_id) {
        this._Merchant_id = _Merchant_id;
    }

    public String getMerchant_password() {
        return _Merchant_password;
    }

    public void setMerchant_password(String _Merchant_password) {
        this._Merchant_password = _Merchant_password;
    }

    public String getToken() {
        return _token;
    }

    public void setToken(String _token) {
        this._token = _token;
    }
}