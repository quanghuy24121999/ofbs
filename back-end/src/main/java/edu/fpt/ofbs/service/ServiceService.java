package edu.fpt.ofbs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Services;
import edu.fpt.ofbs.models.IServiceDTO;
import edu.fpt.ofbs.repositories.ServiceRepository;

@Service
public class ServiceService{
	@Autowired
	private ServiceRepository serviceRepository;

	public List<Services> findAll() {
		return serviceRepository.findAll();
	}

	public Optional<Services> findServiceById(long id) {
		return serviceRepository.findById(id);
	}

	public List<IServiceDTO> getServicesByRestaurantId(long restaurant_id, long category_id){
		return serviceRepository.getServicesByRestaurantId(restaurant_id, category_id);
	}
}
