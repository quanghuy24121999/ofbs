package edu.fpt.ofbs.models;

public class JwtResponse {
	private final String jwttoken;
	private String phoneLogin;

	public JwtResponse(String phoneLogin, String jwttoken) {
		this.phoneLogin = phoneLogin;
		this.jwttoken = jwttoken;
	}

	public String getToken() {
		return this.jwttoken;
	}
	
	public String getPhoneLogin() {
		return this.phoneLogin;
	}
}
