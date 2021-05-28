package edu.fpt.ofbs.models;

public class JwtRequest {
	private String phoneLogin;
	private String password;

	public JwtRequest() {

	}

	public JwtRequest(String phoneLogin, String password) {
		this.setPhoneLogin(phoneLogin);
		this.setPassword(password);
	}

	public String getPhoneLogin() {
		return this.phoneLogin;
	}

	public void setPhoneLogin(String phoneLogin) {
		this.phoneLogin = phoneLogin;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
