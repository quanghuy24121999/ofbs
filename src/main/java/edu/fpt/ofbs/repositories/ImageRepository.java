package edu.fpt.ofbs.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.fpt.ofbs.entities.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, String>{

}
