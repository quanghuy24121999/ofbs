package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Promotion;
import edu.fpt.ofbs.models.IPromotionDTO;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Long>{
	@Query(value = "call sp_searchPromotionByProvince (?1)", nativeQuery = true)
	List<IPromotionDTO> searchPromotionByProvince(String province);
	
	@Query(value = "call sp_getPromotionsByRestaurantId (?1, ?2)", nativeQuery = true)
	List<IPromotionDTO> getPromotionsByRestaurantId(long restaurantId, boolean isActive);
	
	@Modifying
	@Query(value = "call sp_updateStatusPromotion", nativeQuery = true)
	void updatePromotionStatus();
}
