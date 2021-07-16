package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.models.IRestaurantDTO;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	@Query(value = "call sp_getRestaurantsByType (?1)", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantsByType(int type);
	
	@Query(value = "call sp_searchRestaurant (?1, ?2, ?3, ?4)", nativeQuery = true)
	List<IRestaurantDTO> searchRestaurants(int type, String province, String district, String restaurantName);
	
	@Query(value = "call sp_getRestaurantById (?1)", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantById(long id);
	
	@Query(value = "call sp_getRestaurantsByProviderId (?1, ?2)", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantByProviderId(long providerId, long statusId);
	
	@Query(value = "call sp_adminViewPendingRestaurant", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantPending();
	
	@Modifying
	@Query(value = "call sp_updateStatusRestaurant (?1, ?2, ?3)", nativeQuery = true)
	void updateStatusRestaurant(long restaurantId, String status, String statusUpdate);
	
	@Query(value = "select u.phone_login\r\n"
			+ "  from provider_restaurants res\r\n"
			+ "  join users u on res.provider_id = u.id\r\n"
			+ "  where res.id = ?1", nativeQuery = true)
	String getProviderPhoneLoginFromRestaurantId(long restaurantId);
	
	@Query(value = "call sp_getTotalRestaurantsByStatus (?1)", nativeQuery = true)
	int getTotalRestaurantsByStatus(String status);
}
