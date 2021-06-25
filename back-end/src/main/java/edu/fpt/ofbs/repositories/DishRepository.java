package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Dish;
import edu.fpt.ofbs.models.IDishDTO;

@Repository
public interface DishRepository extends JpaRepository<Dish, Long>{
	@Query(value = "exec sp_getDishesByComboId ?1", nativeQuery = true)
	List<IDishDTO> getDishesByComboId(long comboId);
	
	@Query(value = "exec sp_getDishesByRestaurantId ?1, ?2", nativeQuery = true)
	List<IDishDTO> getDishesByRestaurantId(long restaurantId, long categoryId);
	
	@Query(value = "exec sp_searchDishesByName ?1, ?2", nativeQuery = true)
	List<IDishDTO> searchDishesByName(long restaurantId, String dishName);
}
