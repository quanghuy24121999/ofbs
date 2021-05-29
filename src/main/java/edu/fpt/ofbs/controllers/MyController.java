package edu.fpt.ofbs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.models.UserDTO;
import edu.fpt.ofbs.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MyController {
	@Autowired
	private UserService userService;
	
	@GetMapping("/user")
	public ResponseEntity<?> getAllUser() {
		List<User> user = userService.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
//
//	@RequestMapping(value = "/register", method = RequestMethod.POST)
//	public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
//		return ResponseEntity.ok(userService.save(user));
//	}
}
