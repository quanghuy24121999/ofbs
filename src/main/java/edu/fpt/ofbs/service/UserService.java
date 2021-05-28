package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import edu.fpt.ofbs.entities.Users;
import edu.fpt.ofbs.models.UserDTO;

public interface UserService extends UserDetailsService{
	public List<Users> findAll();

	public Users save(UserDTO user) ;
}
