package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.models.UserDTO;

public interface UserService extends UserDetailsService{
	public List<User> findAll();
	
	public UserDetails loadUserByUsername(String username);
	//1
	public User save(UserDTO user) ;
}
