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
	
	public List<IOrderDTO> getOrderByProviderId (long providerId){
		return orderRepository.getOrderByProviderId(providerId);
	}
	
	public void insertOrder(OrderSaveDTO order) {
		Date orderDate = new Date();
		
		String orderCode = "FBS" + order.getCustomerId() + order.getRestaurantId() + "OD" + orderDate.getTime();
		
		orderRepository.insertOrder(order.getTime(), orderDate, order.getCustomerId(), order.getRestaurantId(), order.getTableType(), order.getNumberOfGuests(), order.getNote(), order.getOrganizeDate(), orderCode);
	}
	
	public void deleteOrder(long orderId) {
		orderRepository.deleteById(orderId);
	}
	
	public void updateOrderStatus(long customerId, long restaurantId) {
		orderRepository.updateOrderStatus(customerId, restaurantId);
	}
}
