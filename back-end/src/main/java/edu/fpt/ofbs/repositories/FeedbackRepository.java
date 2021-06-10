package edu.fpt.ofbs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Feedback;
import edu.fpt.ofbs.models.IFeedbackDTO;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{
	@Query(value = "exec sp_getFeedbackByRestaurantId @restaurant_id = ?1, @rate = ?2", nativeQuery = true)
	List<IFeedbackDTO> getFeedbackByRestaurantId(int restaurantId, float rate);
}
