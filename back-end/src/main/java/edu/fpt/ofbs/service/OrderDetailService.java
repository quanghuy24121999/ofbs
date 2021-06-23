package edu.fpt.ofbs.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.models.IOrderDetailDTO;
import edu.fpt.ofbs.models.OrderDetailSaveDTO;
import edu.fpt.ofbs.repositories.OrderDetailRepository;

@Service
@Transactional
public class OrderDetailService {
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	public void insertOrderDetail(OrderDetailSaveDTO orderDetail) {
		orderDetailRepository.insertOrderDetail(orderDetail.getQuantity(), orderDetail.getDishId(), orderDetail.getComboId(), 
				orderDetail.getServiceId(), orderDetail.getCustomerId(), orderDetail.getRestaurantId());
	}
	
	public void deleteOrderDetail(long orderId) {
		orderDetailRepository.deleteOrderDetail(orderId);
	}
	
	public List<IOrderDetailDTO> getOrderDetailByOrderId(long orderId){
		return orderDetailRepository.getOrderDetailByOrderId(orderId);
	}
}
