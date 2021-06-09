package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Image;
import edu.fpt.ofbs.models.IImageDTO;

@Repository
public interface ImageRepository extends JpaRepository<Image, String>{
	@Query(value = "exec sp_getImagesByRestaurantId @restaurant_id = ?1", nativeQuery = true)
	List<IImageDTO> getImagesByRestaurantId(int restaurantId);
}
