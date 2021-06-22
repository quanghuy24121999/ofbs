package edu.fpt.ofbs.service;

import java.text.SimpleDateFormat;
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
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		String time = order.getTime() + " " + formatter.format(order.getTimeDate());
		
		orderRepository.insertOrder(time, order.getCustomerId(), order.getRestaurantId(), order.getTableType(), order.getNumberOfGuests(), order.getNote());
	}
}
