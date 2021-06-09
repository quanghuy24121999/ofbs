package edu.fpt.ofbs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Status;
import edu.fpt.ofbs.repositories.StatusRepository;

@Service
public class StatusService {
	@Autowired
	private StatusRepository statusRepository;
	
	public Status findStatusById(int id) {
		return statusRepository.findById(id).get();
	}
}
