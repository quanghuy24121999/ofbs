package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.OrderDetail;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long>{
	@Modifying
	@Query(value = "exec sp_insertOrderDetail @quantity = ?1, @dish_id= ?2, @combo_id = ?3, @service_id = ?4, @customer_id = ?5, @restaurant_id = ?6", nativeQuery = true)
	void insertOrderDetail(int quantity, long dishId, long comboId, long serviceId, long customerId, long restaurantId);
}
