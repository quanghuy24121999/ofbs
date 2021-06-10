package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.models.IDishDTO;
import edu.fpt.ofbs.repositories.DishRepository;

@Service
public class DishService {
	@Autowired
	private DishRepository dishRepository;
	
	public List<IDishDTO> getDishesByComboId(int comboId){
		return dishRepository.getDishesByComboId(comboId);
	}
	
	public List<IDishDTO> getDishesByRestaurantId(int restaurantId, int categoryId){
		return dishRepository.getDishesByRestaurantId(restaurantId, categoryId);
	}
	
	public List<IDishDTO> searchDishesByName(int restaurantId, String dishName){
		return dishRepository.searchDishesByName(restaurantId, dishName);
	}
}
