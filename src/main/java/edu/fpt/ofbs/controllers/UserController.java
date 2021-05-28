package edu.fpt.ofbs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.entities.Users;
import edu.fpt.ofbs.models.UserDTO;
import edu.fpt.ofbs.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public ResponseEntity<?> getAllUsers() {
		List<Users> users = userService.findAll();
		System.out.println(users);
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}
	

	@GetMapping("/findByPhoneNumber/{phoneNumber}")
	public ResponseEntity<?> findByPhoneNumber(@PathVariable("phoneNumber") String phoneNumber) {
		Users users = userService.findByPhoneNumberLogin(phoneNumber);
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}
}
