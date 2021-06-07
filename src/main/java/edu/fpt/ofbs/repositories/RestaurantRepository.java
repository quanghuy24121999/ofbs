package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.models.IRestaurantDTO;
import edu.fpt.ofbs.models.RestaurantDTO;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{
	@Query(value = "SELECT res.id as restaurantId, img_tp.image_type as imageType, pr_tp.name, res.restaurant_name as restaurantName, "
			+ "		img.id as imageId, res.province, \r\n"
			+ "		res.size, AVG(fb.rate) as rate\r\n"
			+ "		FROM provider_restaurants res \r\n"
			+ "			join provider_types pr_tp on pr_tp.id =  res.provider_type_id \r\n"
			+ "			join images img on img.restaurant_id = res.id\r\n"
			+ "			join image_types img_tp on img.type_id = img_tp.id\r\n"
			+ "			join feedbacks fb on  fb.restaurant_id = res.id\r\n"
			+ "		WHERE img_tp.image_type like 'Avatar' and pr_tp.name like N'Tổ chức lưu động'\r\n"
			+ "		GROUP BY res.id, res.restaurant_name, img.id, res.province, res.size, img_tp.image_type, pr_tp.name\r\n"
			+ "		ORDER BY rate asc", nativeQuery = true)
	List<IRestaurantDTO> getRestaurantByType();
}
