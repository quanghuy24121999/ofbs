package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Order;
import edu.fpt.ofbs.models.IOrderDTO;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
	@Query(value = "exec sp_getOrderByCustomerId @customer_id = ?1, @status_id = ?2", nativeQuery = true)
	List<IOrderDTO> getOrderByCustomerId (int customerId, int statusId);
	
	@Query(value = "exec sp_getOrderByProviderId @provider_id = ?1", nativeQuery = true)
	List<IOrderDTO> getOrderByProviderId (int providerId);
}
