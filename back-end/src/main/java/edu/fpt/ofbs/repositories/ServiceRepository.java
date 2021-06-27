package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Services;
import edu.fpt.ofbs.models.IServiceDTO;

@Repository
public interface ServiceRepository extends JpaRepository<Services, Long>{
	@Query(value = "exec sp_getServicesByRestaurantId ?1, ?2", nativeQuery = true)
	List<IServiceDTO> getServicesByRestaurantId(long restaurant_id, long category_id);
	
	@Query(value = "exec sp_searchService ?1, ?2, ?3", nativeQuery = true)
	List<IServiceDTO> searchServices(long restaurant_id, String serviceName, String category);
}
