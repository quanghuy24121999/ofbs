package edu.fpt.ofbs.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Role;
import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.models.CustomUserDetails;
import edu.fpt.ofbs.models.IUserDTO;
import edu.fpt.ofbs.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService{
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleService roleService;

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User save(User user) {
		return userRepository.save(user);
	}

	public User findByPhoneNumberLogin(String phoneNumber) {
		return userRepository.findByPhoneNumberLogin(phoneNumber);
	}
	
	public Optional<User> findById(long id) {
		return userRepository.findById(id);
	}

	public IUserDTO getUserProfileById(long userId) {
		return userRepository.getUserProfileById(userId);
	}
	
	public User updateRoleProvider(User user) {
		Role role = roleService.findByName("ROLE_PROVIDER");
		
		user.setRole(role);
		user.setLastModified(new Date());
		
		return userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String phoneLogin) throws UsernameNotFoundException {
		// Kiểm tra xem user có tồn tại trong database không?
        User user = userRepository.findByPhoneNumberLogin(phoneLogin);
        if (user == null) {
            throw new UsernameNotFoundException(phoneLogin);
        }
        return new CustomUserDetails(user);
	}
	
	public UserDetails loadUserById(long userId) throws UsernameNotFoundException {
		User user = userRepository.findById(userId).get();
		if (user == null) {
			throw new UsernameNotFoundException("not found user " + userId);
		}
		return new CustomUserDetails(user);
	}
	
	public int getNumberOfUsersActive() {
		return userRepository.getNumberOfUsersActive();
	}
	
	public void updateBalance(float balance, long userId) {
		userRepository.updateBalance(balance, userId);
	}
}
