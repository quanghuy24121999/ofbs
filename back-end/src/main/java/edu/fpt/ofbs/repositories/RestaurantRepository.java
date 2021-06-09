package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.models.IRestaurantDTO;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{
	@Query(value = "exec sp_getRestaurantsByType @restaurant_type = ?1", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantsByType(int type);
	
	@Query(value = "exec sp_searchRestaurant @restaurant_type = ?1, @restaurant_province = ?2, @restaurant_district = ?3, @restaurant_name = ?4", nativeQuery = true)
	List<IRestaurantDTO> searchRestaurants(int type, String province, String district, String restaurantName);
	
	@Query(value = "exec sp_getRestaurantById @restaurant_id = ?1", nativeQuery = true)
	IRestaurantDTO getRestaurantById(int id);
}
