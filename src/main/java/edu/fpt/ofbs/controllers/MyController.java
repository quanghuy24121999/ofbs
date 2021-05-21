package edu.fpt.ofbs.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.models.User;
import edu.fpt.ofbs.service.UserService;

@RestController
@RequestMapping("/user")
public class MyController {
	@Autowired
	private UserService userService;
	
	@GetMapping("")
	public ResponseEntity<?> getAllUser() {
		List<User> users = userService.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(users);
	}
}
