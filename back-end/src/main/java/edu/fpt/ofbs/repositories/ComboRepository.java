package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Combo;
import edu.fpt.ofbs.models.IComboDTO;

@Repository
public interface ComboRepository extends JpaRepository<Combo, Long>{
	@Query(value = "exec sp_getCombosByRestaurantId ?1, ?2", nativeQuery = true)
	List<IComboDTO> getCombosByRestaurantId(long restaurantId, boolean isActive);
}
