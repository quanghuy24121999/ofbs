package edu.fpt.ofbs.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Users;
import edu.fpt.ofbs.models.UserDTO;
import edu.fpt.ofbs.repositories.UserRepository;
import edu.fpt.ofbs.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired 
	private EntityManager entityManager;

	@Override
	public List<Users> findAll() {
		return userRepository.findAll();
	}


	@Override
	public UserDetails loadUserByUsername(String phoneLogin) throws UsernameNotFoundException {
		Users user = userRepository.findByPhoneLogin(phoneLogin);
		if(user == null) {
			throw new UsernameNotFoundException("User not found with phone number: " + phoneLogin);
		}
		return new org.springframework.security.core.userdetails.User(user.getPhoneLogin(), user.getPassword(),
                new ArrayList<>());
	}	
	
	public Users save(UserDTO user) {
        Users newUser = new Users();
        newUser.setPhoneLogin(user.getPhoneLogin());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(newUser);
    }

	@Override
	public UserDTO findByPhoneNumberLogin(String phoneNumber) {
		String sql = "Select u from users u where u.phone_login like '%:phoneNumber%'";
		
		TypedQuery<UserDTO> query = entityManager.createQuery(sql, UserDTO.class);
		query.setParameter("phoneNumber", phoneNumber);
		
		return query.getResultList().get(0);
	}
}
