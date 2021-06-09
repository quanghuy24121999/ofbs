package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Integer>{
	
}
