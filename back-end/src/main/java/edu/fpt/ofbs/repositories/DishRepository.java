package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Dish;
import edu.fpt.ofbs.models.IDishDTO;

@Repository
public interface DishRepository extends JpaRepository<Dish, Integer>{
	@Query(value = "exec sp_getDishesByComboId @combo_id = ?1", nativeQuery = true)
	List<IDishDTO> getDishesByComboId(int comboId);
	
	@Query(value = "exec sp_getDishesByRestaurantId @restaurant_id = ?1, @category_id = ?2", nativeQuery = true)
	List<IDishDTO> getDishesByRestaurantId(int restaurantId, int categoryId);
	
	@Query(value = "exec sp_searchDishesByName @restaurant_id = ?1, @dish_name = ?2", nativeQuery = true)
	List<IDishDTO> searchDishesByName(int restaurantId, String dishName);
}
