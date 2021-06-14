package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.models.IUserDTO;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	@Query(value = "exec sp_findByPhoneNumber @phone_number= ?1", nativeQuery = true)
	User findByPhoneNumberLogin(String phoneNumber);
	
	@Query(value = "exec sp_getUserProfileById @user_id = ?1", nativeQuery = true)
	IUserDTO getUserProfileById(int userId);
}
