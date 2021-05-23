package edu.fpt.ofbs.models;

public class JwtResponse {
	private final String jwttoken;
	private String username;

	public JwtResponse(String username, String jwttoken) {
		this.username = username;
		this.jwttoken = jwttoken;
	}

	public String getToken() {
		return this.jwttoken;
	}
	
	public String getUsername() {
		return this.username;
	}
}
