package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.models.IOrderDTO;
import edu.fpt.ofbs.repositories.OrderRepository;

@Service
public class OrderService {
	@Autowired
	private OrderRepository orderRepository;
	
	public List<IOrderDTO> getOrderByCustomerId (int customerId, int statusId){
		return orderRepository.getOrderByCustomerId(customerId, statusId);
	}
	
	public List<IOrderDTO> getOrderByProviderId (int providerId){
		return orderRepository.getOrderByProviderId(providerId);
	}
	
}
