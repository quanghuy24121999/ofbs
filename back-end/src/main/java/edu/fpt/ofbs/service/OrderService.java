package edu.fpt.ofbs.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.models.IOrderDTO;
import edu.fpt.ofbs.models.OrderSaveDTO;
import edu.fpt.ofbs.repositories.OrderRepository;

@Service
@Transactional
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	
	public List<IOrderDTO> getOrderByCustomerId (long customerId, long statusId){
		return orderRepository.getOrderByCustomerId(customerId, statusId);
	}
	
	public List<IOrderDTO> getOrderByRestaurantId (long restaurantId, String orderCode){
		return orderRepository.getOrderByRestaurantId(restaurantId, orderCode);
	}
	
	public void insertOrder(OrderSaveDTO order) {
		Date orderDate = new Date();
		
		order.setOrderCode("FBS" + order.getCustomerId() + order.getRestaurantId() + "OD" + orderDate.getTime());
		
		orderRepository.insertOrder(order.getTime(), orderDate, order.getCustomerId(), order.getRestaurantId(), order.getTableType(), order.getNumberOfGuests(), order.getNote(), order.getOrganizeDate(), order.getOrderCode());
	}
	
	public void deleteOrder(long orderId) {
		orderRepository.deleteById(orderId);
	}
	
	public void setOrderStatus(long customerId, long restaurantId) {
		orderRepository.setOrderStatus(customerId, restaurantId);
	}
	
	public void updateOrderStatus(long orderId, String status) {
		orderRepository.updateOrderStatus(orderId, status);
	}
	
	public int getTotalOrderByStatus(String status, String fromDate, String toDate) {
		return orderRepository.getTotalOrderByStatus(status, fromDate, toDate);
	}
	
	public List<IOrderDTO> getOrders(String orderCode, String fromDate, String toDate, String status){
		return orderRepository.getOrders(orderCode, fromDate, toDate, status);
	}
}
