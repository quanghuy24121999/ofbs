package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	@Query(value = "exec sp_findByPhoneNumber @phone_number= ?1", nativeQuery = true)
	User findByPhoneNumberLogin(String phoneNumber);
}
