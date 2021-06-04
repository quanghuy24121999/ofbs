package edu.fpt.ofbs.controllers;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;

	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@GetMapping("")
	public ResponseEntity<?> getAllUsers() {
		List<User> user = userService.findAll();
		System.out.println(user);
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
	public ResponseEntity<?> newUserRegister(@RequestBody User user) {
		User newUser = new User();
		if (user != null) {
			newUser.setPhoneLogin(user.getPhoneLogin());
			newUser.setFirstName(user.getFirstName());
			newUser.setLastName(user.getLastName());
			newUser.setPassword(passwordEncoder.encode(user.getPassword()));
			newUser.setPhoneNumber(user.getPhoneNumber());
			newUser.setStatusId(1);
			newUser.setRoleId(3);
			newUser.setLastModified(Date.valueOf(LocalDate.now()));
		}
		userService.save(newUser);
		return ResponseEntity.status(HttpStatus.OK).body(newUser);
	}
}
