package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.models.IPromotionDTO;
import edu.fpt.ofbs.repositories.PromotionRepository;

@Service
public class PromotionService {
	@Autowired
	private PromotionRepository promotionRepository;
	
	public List<IPromotionDTO> searchPromotionByProvince(String province){
		return promotionRepository.searchPromotionByProvince(province);
	}
}
