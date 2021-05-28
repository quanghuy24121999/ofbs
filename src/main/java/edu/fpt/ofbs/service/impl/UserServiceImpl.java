package edu.fpt.ofbs.service.impl;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Users;
import edu.fpt.ofbs.models.UserDTO;
import edu.fpt.ofbs.repositories.UserRepository;
import edu.fpt.ofbs.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;
	
	@Autowired 
	private EntityManager entityManager;

	@Override
	public List<Users> findAll() {
		return userRepository.findAll();
	}

	
	public Users save(UserDTO user) {
        Users newUser = new Users();
        return userRepository.save(newUser);
    }

	@Override
	public Users findByPhoneNumberLogin(String phoneNumber) {
		String sql = "Select u from users u where u.phoneLogin like :phoneNumber";
		
		TypedQuery<Users> query = entityManager.createQuery(sql, Users.class);
		query.setParameter("phoneNumber","%" + phoneNumber + "%");
		if (query.getResultList().size() > 0) {
			return query.getResultList().get(0);
		}
		return new Users();
	}
}
