package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Promotion;
import edu.fpt.ofbs.models.IPromotionDTO;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer>{
	@Query(value = "exec sp_searchPromotionByProvince @province = ?1", nativeQuery = true)
	List<IPromotionDTO> searchPromotionByProvince(String province);
}
