package edu.fpt.ofbs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Role;
import edu.fpt.ofbs.repositories.RoleRepository;

@Service
public class RoleService {
	@Autowired
	private RoleRepository roleRepository;
	
	public Role findRoleById(long id) {
		return roleRepository.findById(id).get();
	}
}
