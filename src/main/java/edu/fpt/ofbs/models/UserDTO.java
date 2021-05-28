package edu.fpt.ofbs.models;

public class UserDTO {
	private String phoneLogin;

	private String password;

	public UserDTO() {
	}

	public UserDTO(String phoneLogin, String password) {
		this.phoneLogin = phoneLogin;
		this.password = password;
	}

	public String getPhoneLogin() {
		return phoneLogin;
	}

	public void setPhoneLogin(String name) {
		this.phoneLogin = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
