package edu.fpt.ofbs.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.models.IOrderDTO;
import edu.fpt.ofbs.models.IOrderDetailDTO;
import edu.fpt.ofbs.models.OrderDetailSaveDTO;
import edu.fpt.ofbs.models.OrderSaveDTO;
import edu.fpt.ofbs.models.ResponseMessage;
import edu.fpt.ofbs.service.OrderDetailService;
import edu.fpt.ofbs.service.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private OrderDetailService orderDetailService;
	
	@GetMapping("/customer")
	public ResponseEntity<?> getOrderByCustomerId(@PathParam("customerId") long customerId, @PathParam("statusId") long statusId) {
		List<IOrderDTO> orders = orderService.getOrderByCustomerId(customerId, statusId);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
	
	@GetMapping("/provider")
	public ResponseEntity<?> getOrderByProviderId(@PathParam("providerId") long providerId) {
		List<IOrderDTO> orders = orderService.getOrderByProviderId(providerId);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
	
	@PostMapping("/insertOrder")
	public ResponseEntity<?> insertOrder(@RequestBody OrderSaveDTO order) {
		String message = "";
		
		try {
			orderService.insertOrder(order);

			message = "Insert the order successfully !";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not insert order !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@PostMapping("/insertOrderDetail")
	public ResponseEntity<?> insertOrderDetail(@RequestBody List<OrderDetailSaveDTO> orders) {
		String message = "";
		
		try {
			orderDetailService.insertOrderDetail(orders);

			message = "Insert the order detail successfully !";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not insert order detail !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@DeleteMapping("/deleteOrder")
	public ResponseEntity<?> deleteOrder(@PathParam("orderId") long orderId) {
		String message = "";
		
		try {
			orderService.deleteOrder(orderId);

			message = "Delete the order successfully !";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not delete order !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@DeleteMapping("/deleteOrderDetail")
	public ResponseEntity<?> deleteOrderDetail(@PathParam("orderId") long orderId) {
		String message = "";
		
		try {
			orderDetailService.deleteOrderDetail(orderId);

			message = "Delete the order detail successfully !";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not delete order detail !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@PatchMapping("/updateStatus")
	public ResponseEntity<?> updateOrderStatus(@PathParam("customerId") long customerId, @PathParam("restaurantId") long restaurantId) {
		String message = "";
		
		try {
			orderService.updateOrderStatus(customerId, restaurantId);
			
			message = "Update order status successfully !";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not update order status !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}
	
	@GetMapping("/orderDetail/infor")
	public ResponseEntity<?> getOrderDetailByOrderId(@PathParam("orderId") long orderId) {
		List<IOrderDetailDTO> orders = orderDetailService.getOrderDetailByOrderId(orderId);
		return ResponseEntity.status(HttpStatus.OK).body(orders);
	}
}
