package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.fpt.ofbs.entities.Dish;
import edu.fpt.ofbs.entities.DishCombo;
import edu.fpt.ofbs.entities.MenuCategory;
import edu.fpt.ofbs.models.IDishDTO;
import edu.fpt.ofbs.repositories.DishComboRepository;
import edu.fpt.ofbs.repositories.DishRepository;
import edu.fpt.ofbs.repositories.MenuCategoryRepository;

@Service
@Transactional
public class DishService {
	@Autowired
	private DishRepository dishRepository;
	
	@Autowired
	private MenuCategoryRepository categoryRepository;
	
	@Autowired
	private DishComboRepository dishComboRepository;
	
	@Autowired
	private StatusService statusService;
	
	public List<IDishDTO> getDishesByComboId(long comboId){
		return dishRepository.getDishesByComboId(comboId);
	}
	
	public List<IDishDTO> getDishesByRestaurantId(long restaurantId, long categoryId, String dishName, long statusId){
		return dishRepository.getDishesByRestaurantId(restaurantId, categoryId, dishName, statusId);
	}
	
//	public List<IDishDTO> searchDishesByName(long restaurantId, String dishName){
//		return dishRepository.searchDishesByName(restaurantId, dishName);
//	}
	
	public Dish getDishById(long id) {
		return dishRepository.findById(id).get();
	}
	
	public void saveDish(Dish dish) {
		dishRepository.save(dish);
	}
	
	public void updateStatus(long dishId) {
		long statusId = statusService.findStatusByName("banned").getId();
		dishRepository.updateStatus(statusId, dishId);
	}
	
	public List<MenuCategory> getAllMenuCategories(){
		return categoryRepository.findAll();
	}
	
	public void addDishCombo(DishCombo dishCombo) {
		dishComboRepository.save(dishCombo);
	}
	
	public void removeDishCombo(long comboId, long dishId) {
		dishComboRepository.deleteById(dishComboRepository.getDishComboId(comboId, dishId));
	}
}
