package edu.fpt.ofbs.service;

import java.util.List;
import java.util.Optional;

import edu.fpt.ofbs.entities.Service;

public interface ServiceService {
	public List<Service> findAll();
	
	public Optional<Service> findServiceById(int id);
}
