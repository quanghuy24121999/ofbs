package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Services;
import edu.fpt.ofbs.models.IServiceDTO;

@Repository
public interface ServiceRepository extends JpaRepository<Services, Integer>{
	@Query(value = "exec sp_getServicesByRestaurantId @restaurant_id = ?1, @category_id = ?2", nativeQuery = true)
	List<IServiceDTO> getServicesByRestaurantId(int restaurant_id, int category_id);
}
