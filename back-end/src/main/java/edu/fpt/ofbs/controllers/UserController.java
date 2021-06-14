package edu.fpt.ofbs.controllers;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.entities.Role;
import edu.fpt.ofbs.entities.Status;
import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.models.IUserDTO;
import edu.fpt.ofbs.models.RegisterUserDTO;
import edu.fpt.ofbs.service.RoleService;
import edu.fpt.ofbs.service.StatusService;
import edu.fpt.ofbs.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private StatusService statusService;
	
	@Autowired
	private RoleService roleService;

	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@GetMapping("")
	public ResponseEntity<?> getAllUsers() {
		List<User> user = userService.findAll();
		
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

	@GetMapping("/findByPhoneNumber/{phoneNumber}")
	public ResponseEntity<?> findByPhoneNumber(@PathVariable("phoneNumber") String phoneNumber) {
		User user = userService.findByPhoneNumberLogin(phoneNumber);
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

	@RequestMapping(value = "/update/{id}", method = RequestMethod.PATCH)
	public ResponseEntity<?> updateUser(@PathVariable("id") int id, @RequestBody User user) {
		Optional<User> userOption = userService.findById(id);
		if (userOption.isPresent()) {
			User _user = userOption.get();
			_user.setPassword(passwordEncoder.encode(user.getPassword()));
			return new ResponseEntity<>(userService.save(_user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}

	@PostMapping("/login")
	public ResponseEntity<?> findUserLogin(@RequestBody User user) {
		User userLogin = userService.findByPhoneNumberLogin(user.getPhoneLogin());
		if (userLogin != null) {
			if (passwordEncoder.matches(user.getPassword(), userLogin.getPassword())) {
				return ResponseEntity.status(HttpStatus.OK).body(userLogin);
			}
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PostMapping("/register")
	public ResponseEntity<?> newUserRegister(@RequestBody RegisterUserDTO user) {
		User newUser = new User();
		if (user != null) {
			newUser.setPhoneLogin(user.getPhoneLogin());
			newUser.setName(user.getName());
			newUser.setPassword(passwordEncoder.encode(user.getPassword()));
			newUser.setPhoneNumber(user.getPhoneNumber());
			
			Status status = statusService.findStatusById(1);
			newUser.setStatus(status);
			
			Role role = roleService.findRoleById(3);
			newUser.setRole(role);
			
			newUser.setLastModified(Date.valueOf(LocalDate.now()));
		}
		userService.save(newUser);
		return ResponseEntity.status(HttpStatus.OK).body(newUser);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<?> getUserProfileById(@PathParam("userId") int userId) {
		IUserDTO user = userService.getUserProfileById(userId);
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
	@PatchMapping("/profile/update")
	public ResponseEntity<?> findUserLogin(@PathParam("userId") int userId, @RequestBody User user) {
		Optional<User> userOption = userService.findById(userId);
		if (userOption.isPresent()) {
			User _user = userOption.get();
			
			_user.setPassword(passwordEncoder.encode(user.getPassword()));
			_user.setName(user.getName());
			_user.setEmail(user.getEmail());
			_user.setPhoneNumber(user.getPhoneNumber());
			_user.setGender(user.isGender());
			_user.setDateOfBirth(user.getDateOfBirth());
			_user.setAddress(user.getAddress());
			return new ResponseEntity<>(userService.save(_user), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
