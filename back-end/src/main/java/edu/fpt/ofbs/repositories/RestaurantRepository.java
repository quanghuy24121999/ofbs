package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.models.IRestaurantDTO;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	@Query(value = "exec sp_getRestaurantsByType ?1", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantsByType(int type);
	
	@Query(value = "exec sp_searchRestaurant ?1, ?2, ?3, ?4", nativeQuery = true)
	List<IRestaurantDTO> searchRestaurants(int type, String province, String district, String restaurantName);
	
	@Query(value = "exec sp_getRestaurantById ?1", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantById(long id);
}
