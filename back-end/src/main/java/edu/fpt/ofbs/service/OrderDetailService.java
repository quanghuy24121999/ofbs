package edu.fpt.ofbs.service;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
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

	public void insertOrderDetail(List<OrderDetailSaveDTO> orderDetails) {
		Configuration config = new Configuration();

		config.setProperty("hibernate.connection.driver_class", "com.microsoft.sqlserver.jdbc.SQLServerDriver");
        config.setProperty("hibernate.connection.url", "jdbc:sqlserver://localhost;databaseName=OFBS");
        config.setProperty("hibernate.connection.username", "root");
        config.setProperty("hibernate.connection.password", "root");
        config.setProperty("hibernate.order_inserts", "true");
        config.setProperty("hibernate.order_updates", "true");
        config.setProperty("hibernate.batch_versioned_data", "true");
		
		SessionFactory sessionFactory = config.buildSessionFactory();
		Session session = sessionFactory.openSession();

		Transaction transaction = session.beginTransaction();

		for (OrderDetailSaveDTO orderDetail : orderDetails) {
			orderDetailRepository.insertOrderDetail(orderDetail.getQuantity(), orderDetail.getDishId(),
					orderDetail.getComboId(), orderDetail.getServiceId(), orderDetail.getCustomerId(),
					orderDetail.getRestaurantId());
		}
		
		transaction.commit();
        session.close();
 
        sessionFactory.close();
	}

	public void deleteOrderDetail(long orderId) {
		orderDetailRepository.deleteOrderDetail(orderId);
	}

	public List<IOrderDetailDTO> getOrderDetailByOrderId(long orderId) {
		return orderDetailRepository.getOrderDetailByOrderId(orderId);
	}
	
	public List<IOrderDetailDTO> getOrderDetailByOrderCode(String orderCode){
		return getOrderDetailByOrderId(orderDetailRepository.getOrderIdByOrderCode(orderCode));
	}
}
