package edu.fpt.ofbs.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Order;
import edu.fpt.ofbs.models.IOrderDTO;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
	@Query(value = "exec sp_getOrderByCustomerId ?1, ?2", nativeQuery = true)
	List<IOrderDTO> getOrderByCustomerId (long customerId, long statusId);
	
	@Query(value = "exec sp_getOrderByProviderId ?1", nativeQuery = true)
	List<IOrderDTO> getOrderByProviderId (long providerId);
	
	@Modifying
	@Query(value = "exec sp_insertOrder ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9", nativeQuery = true)
	void insertOrder(String time, Date orderDate, long customerId, long restaurantId, int tableType, int NumberOfGuests, String note, Date organizeDate, String orderCode);
	
	@Modifying
	@Query(value = "exec sp_updateOrderStatus ?1, ?2", nativeQuery = true)
	void updateOrderStatus(long customerId, long restaurantId);
}
