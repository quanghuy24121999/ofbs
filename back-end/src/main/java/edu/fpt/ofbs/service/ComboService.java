package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.fpt.ofbs.entities.Combo;
import edu.fpt.ofbs.models.IComboDTO;
import edu.fpt.ofbs.repositories.ComboRepository;

@Service
@Transactional
public class ComboService {
	
	@Autowired
	private ComboRepository comboRepository;
	
	@Autowired
	private StatusService statusService;
	
	public List<IComboDTO> getCombosByRestaurantId(long restaurantId, boolean isActive){
		return comboRepository.getCombosByRestaurantId(restaurantId, isActive);
	}
	
	public Combo getComboById(long id) {
		return comboRepository.findById(id).get();
	}
	
	public void saveCombo(Combo combo) {
		comboRepository.save(combo);
	}
	
	public void updateStatus(long comboId) {
		long statusId = statusService.findStatusByName("banned").getId();
		comboRepository.updateStatus(statusId, comboId);
	}
}
