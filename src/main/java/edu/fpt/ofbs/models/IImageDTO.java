package edu.fpt.ofbs.models;

import org.springframework.web.multipart.MultipartFile;

import edu.fpt.ofbs.entities.Combo;
import edu.fpt.ofbs.entities.Dish;
import edu.fpt.ofbs.entities.ImageType;
import edu.fpt.ofbs.entities.Promotion;
import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.entities.Service;
import edu.fpt.ofbs.entities.User;

public interface IImageDTO {

	MultipartFile getFile();

	User getUser();

	Dish getDish();

	Service getService();

	Combo getCombo();

	Restaurant getRestaurant();

	Promotion getPromotion();

	ImageType getType();
}
