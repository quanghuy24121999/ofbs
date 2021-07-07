package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Feedback;
import edu.fpt.ofbs.entities.Status;
import edu.fpt.ofbs.models.IFeedbackDTO;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long>{
	@Query(value = "exec sp_getFeedbackByRestaurantId ?1, ?2", nativeQuery = true)
	List<IFeedbackDTO> getFeedbackByRestaurantId(long restaurantId, float rate);
	
	List<Feedback> findByRateAndStatus(float rate, Status status);
}
