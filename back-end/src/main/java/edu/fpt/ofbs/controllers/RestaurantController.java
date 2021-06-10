package edu.fpt.ofbs.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.message.ResponseMessage;
import edu.fpt.ofbs.models.FeedbackDTO;
import edu.fpt.ofbs.models.IComboDTO;
import edu.fpt.ofbs.models.IDishDTO;
import edu.fpt.ofbs.models.IFeedbackDTO;
import edu.fpt.ofbs.models.IRestaurantDTO;
import edu.fpt.ofbs.service.ComboService;
import edu.fpt.ofbs.service.DishService;
import edu.fpt.ofbs.service.FeedbackService;
import edu.fpt.ofbs.service.RestaurantService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/restaurants")
public class RestaurantController {
	@Autowired
	private RestaurantService restaurantService;

	@Autowired
	private ComboService comboService;

	@Autowired
	private FeedbackService feedbackService;
	
	@Autowired
	private DishService dishService;

	@GetMapping("/{type}")
	public ResponseEntity<?> getRestaurantsByType(@PathVariable("type") int type) {
		List<IRestaurantDTO> restaurants = restaurantService.getRestaurantsByType(type);
		return ResponseEntity.status(HttpStatus.OK).body(restaurants);
	}

	@GetMapping("")
	public ResponseEntity<?> searchRestaurants(@PathParam("type") int type, @PathParam("province") String province,
			@PathParam("district") String district, @PathParam("restaurantName") String restaurantName) {
		List<IRestaurantDTO> restaurants = restaurantService.searchRestaurants(type, province, district,
				restaurantName);
		return ResponseEntity.status(HttpStatus.OK).body(restaurants);
	}

	@GetMapping("/detail")
	public ResponseEntity<?> getRestaurantById(@PathParam("restaurantId") int restaurantId) {
		IRestaurantDTO restaurant = restaurantService.getRestaurantById(restaurantId);
		return ResponseEntity.status(HttpStatus.OK).body(restaurant);
	}

	@GetMapping("/combos")
	public ResponseEntity<?> getCombosByRestaurantId(@PathParam("restaurantId") int restaurantId) {
		List<IComboDTO> combos = comboService.getCombosByRestaurantId(restaurantId);
		return ResponseEntity.status(HttpStatus.OK).body(combos);
	}
	
	@GetMapping("/combos/dishes")
	public ResponseEntity<?> getDishesByComboId(@PathParam("comboId") int comboId) {
		List<IDishDTO> dishes = dishService.getDishesByComboId(comboId);
		return ResponseEntity.status(HttpStatus.OK).body(dishes);
	}

	@GetMapping("/feedbacks")
	public ResponseEntity<?> getFeedbackByRestaurantId(@PathParam("restaurantId") int restaurantId, @PathParam("rate") float rate) {
		List<IFeedbackDTO> feedbacks = feedbackService.getFeedbackByRestaurantId(restaurantId, rate);
		return ResponseEntity.status(HttpStatus.OK).body(feedbacks);
	}

	@PostMapping("/insertFeedback")
	public ResponseEntity<?> insertFeedback(@RequestBody FeedbackDTO feedback) {
		String message = "";
		try {
			feedbackService.save(feedback);

			message = "Insert the feedback successfully !";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not insert feedback !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@GetMapping("/menu")
	public ResponseEntity<?> getDishesByRestaurantId(@PathParam("restaurantId") int restaurantId, @PathParam("categoryId") int categoryId) {
		List<IDishDTO> dishes = dishService.getDishesByRestaurantId(restaurantId, categoryId);
		return ResponseEntity.status(HttpStatus.OK).body(dishes);
	}
	
	@GetMapping("/menu/searchDishes")
	public ResponseEntity<?> searchDishesByName(@PathParam("restaurantId") int restaurantId, @PathParam("name") String name) {
		List<IDishDTO> dishes = dishService.searchDishesByName(restaurantId, name);
		return ResponseEntity.status(HttpStatus.OK).body(dishes);
	}
}
