package edu.fpt.ofbs.service.impl;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;

import edu.fpt.ofbs.entities.Service;
import edu.fpt.ofbs.repositories.ServiceRepository;
import edu.fpt.ofbs.service.ServiceService;

public class ServiceServiceImpl implements ServiceService{
	@Autowired
	private ServiceRepository serviceRepository;

	@Override
	public List<Service> findAll() {
		return serviceRepository.findAll();
	}

	@Override
	public Optional<Service> findServiceById(int id) {
		return serviceRepository.findById(id);
	}

}
