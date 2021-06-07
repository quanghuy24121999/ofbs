package edu.fpt.ofbs.models;

import org.springframework.web.multipart.MultipartFile;

import edu.fpt.ofbs.entities.Combo;
import edu.fpt.ofbs.entities.Dish;
import edu.fpt.ofbs.entities.ImageType;
import edu.fpt.ofbs.entities.Promotion;
import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.entities.Service;
import edu.fpt.ofbs.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ImageDTO {
	private MultipartFile file;
	private User user;
	private Dish dish;
	private Service service;
	private Combo combo;
	private Restaurant restaurant;
	private Promotion promotion;
	private ImageType type;
}
