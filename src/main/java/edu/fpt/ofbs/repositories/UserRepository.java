package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer>{
	Users findByPhoneLogin(String phoneLogin);
}
