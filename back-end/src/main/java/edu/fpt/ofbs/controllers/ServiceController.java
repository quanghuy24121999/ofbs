package edu.fpt.ofbs.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.entities.Services;
import edu.fpt.ofbs.models.IServiceDTO;
import edu.fpt.ofbs.service.ServiceService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/services")
public class ServiceController {
	@Autowired
	private ServiceService serviceService;
	
	@GetMapping("/getServiceByRestaurantId")
	public ResponseEntity<?> getServicesByRestaurantId(@PathParam("restaurantId") long restaurantId, @PathParam("categoryId") long categoryId) {
		List<IServiceDTO> services = serviceService.getServicesByRestaurantId(restaurantId, categoryId);
		return ResponseEntity.status(HttpStatus.OK).body(services);
	}
	
	@GetMapping("/search")
	public ResponseEntity<?> searchServices(@PathParam("restaurantId") long restaurantId, @PathParam("serviceName") String serviceName, @PathParam("category") String category) {
		List<IServiceDTO> services = serviceService.searchServices(restaurantId, serviceName, category);
		return ResponseEntity.status(HttpStatus.OK).body(services);
	}
	
	@GetMapping("/getServiceById")
	public ResponseEntity<?> getServiceById(@PathParam("serviceId") long serviceId) {
		Services service = serviceService.findServiceById(serviceId);
		return ResponseEntity.status(HttpStatus.OK).body(service);
	}
	
	@PostMapping("/update")
	public ResponseEntity<?> updateInforRestaurant(@RequestBody Services service){
		serviceService.updateService(service);
		
		return ResponseEntity.status(HttpStatus.OK).body(service);
	}
}
