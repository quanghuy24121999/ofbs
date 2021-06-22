package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.models.IComboDTO;
import edu.fpt.ofbs.repositories.ComboRepository;

@Service
public class ComboService {
	
	@Autowired
	private ComboRepository comboRepository;
	
	public List<IComboDTO> getCombosByRestaurantId(long restaurantId){
		return comboRepository.getCombosByRestaurantId(restaurantId);
	}
}
