package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.models.RestaurantDTO;
import edu.fpt.ofbs.repositories.RestaurantRepository;

@Service
public class RestaurantService {

	@Autowired
	private RestaurantRepository restaurantRepository;
	
	public List<RestaurantDTO> getRestaurantByType(int type){
		return restaurantRepository.getRestaurantByType(type);
//		return restaurantRepository.findAll();
	}
}
