package edu.fpt.ofbs.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.repositories.UserRepository;
import edu.fpt.ofbs.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public User findByPhoneNumberLogin(String phoneNumber) {
		String sql = "Select u from user u where u.phoneLogin = :phoneNumber";

		TypedQuery<User> query = entityManager.createQuery(sql, User.class);
		query.setParameter("phoneNumber", phoneNumber);
		if (query.getResultList().size() > 0) {
			return query.getResultList().get(0);
		}
		return null;
	}

	@Override
	public Optional<User> findById(int id) {
		return userRepository.findById(id);
	}

	@Override
	public User findUserLogin(String phone, String password) {
		String sql = "Select u from user u where u.phoneLogin = :phone and u.password = :password";

		TypedQuery<User> query = entityManager.createQuery(sql, User.class);
		query.setParameter("phone", phone);
		query.setParameter("password", password);
		if (query.getResultList().size() > 0) {
			return query.getResultList().get(0);
		}
		return null;
	}

//	@Override
//	public User register(User user) {
//		user.setRoleId(3);
//		user.setLastModified(java.sql.Date.valueOf(LocalDate.now()));
//		user.setStatusId(1);
//		return userRepository.save(user);
//	}
}
