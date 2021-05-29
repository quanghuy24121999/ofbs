package edu.fpt.ofbs.service;

import java.util.List;
import java.util.Optional;

import edu.fpt.ofbs.entities.User;

public interface UserService {
	public List<User> findAll();
	
	public User findByPhoneNumberLogin(String phoneNumber);
	
	public Optional<User> findById(int id);

	public User save(User user) ;
}
