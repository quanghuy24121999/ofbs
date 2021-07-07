package edu.fpt.ofbs.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Feedback;
import edu.fpt.ofbs.entities.Status;
import edu.fpt.ofbs.models.FeedbackDTO;
import edu.fpt.ofbs.models.IFeedbackDTO;
import edu.fpt.ofbs.repositories.FeedbackRepository;

@Service
public class FeedbackService {
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private StatusService statusService;
	
	public List<IFeedbackDTO> getFeedbackByRestaurantId(long restaurantId, float rate){
		return feedbackRepository.getFeedbackByRestaurantId(restaurantId, rate);
	}
	
	public Feedback save(FeedbackDTO feedbackDto) {
		Feedback feedback = new Feedback();
		
		feedback.setFeedbackContent(feedbackDto.getFeedback_content());
		feedback.setFeedback_date(new Date());
		feedback.setRate(feedbackDto.getRate());
		feedback.setRestaurant(restaurantService.findRestaurantById(feedbackDto.getRestaurant_id()));
		feedback.setUser(userService.findById(feedbackDto.getUser_id()).get());
		feedback.setStatus(statusService.findStatusByName("active"));
		
		return feedbackRepository.save(feedback);
	}
	
	public List<Feedback> findByRateAndStatus(){
		Status status = statusService.findStatusById(1);
		return feedbackRepository.findByRateAndStatus(0, status);
	}
}
