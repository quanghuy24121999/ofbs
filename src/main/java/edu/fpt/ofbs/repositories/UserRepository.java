package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.models.UserDTO;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
//	@Query(value = "Select * from users u where u.phone_login = ?1", nativeQuery = true)
	@Query(value = "EXEC Script_User @phone_number = ?1;", nativeQuery = true)
	User findByPhoneNumberLogin(String phoneNumber);
	
	@Query(value = "Select u.phone_login, u.password from users u where u.phone_login = ?1", nativeQuery = true)
	UserDTO findByPhoneNumberLogin1(String phoneNumber);
}
