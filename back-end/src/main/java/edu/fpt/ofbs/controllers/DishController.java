package edu.fpt.ofbs.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.models.IDishDTO;
import edu.fpt.ofbs.service.DishService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/dishes")
public class DishController {
	@Autowired
	private DishService dishService;
	
	@GetMapping("/getDishesByRestaurantId")
	public ResponseEntity<?> getDishesByRestaurantId(@PathParam("restaurantId") long restaurantId, @PathParam("categoryId") long categoryId) {
		List<IDishDTO> dishes = dishService.getDishesByRestaurantId(restaurantId, categoryId);
		return ResponseEntity.status(HttpStatus.OK).body(dishes);
	}
	
	@GetMapping("/getDishesByComboId")
	public ResponseEntity<?> getDishesByComboId(@PathParam("comboId") long comboId) {
		List<IDishDTO> dishes = dishService.getDishesByComboId(comboId);
		return ResponseEntity.status(HttpStatus.OK).body(dishes);
	}
	
	@GetMapping("/searchDishes")
	public ResponseEntity<?> searchDishesByName(@PathParam("restaurantId") long restaurantId, @PathParam("name") String name) {
		List<IDishDTO> dishes = dishService.searchDishesByName(restaurantId, name);
		return ResponseEntity.status(HttpStatus.OK).body(dishes);
	}
}
