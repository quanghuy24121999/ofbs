package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Combo;
import edu.fpt.ofbs.models.IComboDTO;
import edu.fpt.ofbs.repositories.ComboRepository;

@Service
public class ComboService {
	
	@Autowired
	private ComboRepository comboRepository;
	
	public List<IComboDTO> getCombosByRestaurantId(long restaurantId, boolean isActive){
		return comboRepository.getCombosByRestaurantId(restaurantId, isActive);
	}
	
	public Combo getComboById(long id) {
		return comboRepository.findById(id).get();
	}
	
	public void saveCombo(Combo combo) {
		comboRepository.save(combo);
	}
}
