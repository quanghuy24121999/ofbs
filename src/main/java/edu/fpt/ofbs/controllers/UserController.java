package edu.fpt.ofbs.controllers;

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
import org.springframework.web.bind.annotation.PutMapping;
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
		if(userOption.isPresent()) {
			User _user = userOption.get();
			_user.setPassword(passwordEncoder.encode(user.getPassword()));
			return new ResponseEntity<>(userService.save(_user), HttpStatus.OK);	
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}

}
