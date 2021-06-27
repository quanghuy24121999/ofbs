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

import edu.fpt.ofbs.models.IComboDTO;
import edu.fpt.ofbs.service.ComboService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/combos")
public class ComboController {
	@Autowired
	private ComboService comboService;
	
	@GetMapping("/getCombosByRestaurantId")
	public ResponseEntity<?> getCombosByRestaurantId(@PathParam("restaurantId") long restaurantId) {
		List<IComboDTO> combos = comboService.getCombosByRestaurantId(restaurantId);
		return ResponseEntity.status(HttpStatus.OK).body(combos);
	}
}
