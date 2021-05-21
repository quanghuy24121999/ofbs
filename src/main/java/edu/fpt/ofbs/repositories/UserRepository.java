package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

}
