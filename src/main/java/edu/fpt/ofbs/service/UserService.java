package edu.fpt.ofbs.service;

import java.util.List;

import edu.fpt.ofbs.entities.Users;
import edu.fpt.ofbs.models.UserDTO;

public interface UserService {
	public List<Users> findAll();
	
	public Users findByPhoneNumberLogin(String phoneNumber);

	public Users save(UserDTO user) ;
}
