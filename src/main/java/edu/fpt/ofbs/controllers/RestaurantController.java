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

import edu.fpt.ofbs.models.IRestaurantDTO;
import edu.fpt.ofbs.service.RestaurantService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/restaurants")
public class RestaurantController {
	@Autowired
	private RestaurantService restaurantService;
	
	@GetMapping("/{type}")
	public ResponseEntity<?> getRestaurantByType(@PathVariable("type") int type) {
		List<IRestaurantDTO> restaurants = restaurantService.getRestaurantByType(type);
		return ResponseEntity.status(HttpStatus.OK).body(restaurants);
	}
}
