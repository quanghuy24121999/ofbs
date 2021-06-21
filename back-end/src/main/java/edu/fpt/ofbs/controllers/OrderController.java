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

import edu.fpt.ofbs.models.IOrderDTO;
import edu.fpt.ofbs.service.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/customer")
	public ResponseEntity<?> getOrderByCustomerId(@PathParam("customerId") int customerId, @PathParam("statusId") int statusId) {
		List<IOrderDTO> orders = orderService.getOrderByCustomerId(customerId, statusId);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
	
	@GetMapping("/provider")
	public ResponseEntity<?> getOrderByProviderId(@PathParam("customerId") int providerId) {
		List<IOrderDTO> orders = orderService.getOrderByProviderId(providerId);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
}
