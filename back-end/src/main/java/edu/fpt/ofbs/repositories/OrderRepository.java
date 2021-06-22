package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Order;
import edu.fpt.ofbs.models.IOrderDTO;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
	@Query(value = "exec sp_getOrderByCustomerId @customer_id = ?1, @status_id = ?2", nativeQuery = true)
	List<IOrderDTO> getOrderByCustomerId (long customerId, long statusId);
	
	@Query(value = "exec sp_getOrderByProviderId @provider_id = ?1", nativeQuery = true)
	List<IOrderDTO> getOrderByProviderId (long providerId);
	
	@Modifying
	@Query(value = "exec sp_insertOrder @time = ?1, @customer_id = ?2, @restaurant_id = ?3, @table_type = ?4, @number_of_guests = ?5, @note = ?6", nativeQuery = true)
	void insertOrder(String time, long customerId, long restaurantId, int tableType, int NumberOfGuests, String note);
}
