package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.User;
import edu.fpt.ofbs.models.IUserDTO;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	@Query(value = "call sp_findByPhoneNumber (?1)", nativeQuery = true)
	User findByPhoneNumberLogin(String phoneNumber);
	
	@Query(value = "call sp_getUserProfileById (?1)", nativeQuery = true)
	IUserDTO getUserProfileById(long userId);
	
	@Query(value = "select count(u.id) as numberOfUsersActive\r\n"
			+ "from users u\r\n"
			+ "join status s on u.status_id = s.id\r\n"
			+ "join roles r on u.role_id = r.id\r\n"
			+ "where s.name = 'active'\r\n"
			+ "	and (r.name = 'ROLE_CUSTOMER' or r.name = 'ROLE_PROVIDER')", nativeQuery = true)
	int getNumberOfUsersActive();
}
