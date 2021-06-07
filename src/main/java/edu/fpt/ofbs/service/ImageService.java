package edu.fpt.ofbs.service;

import java.io.IOException;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import edu.fpt.ofbs.entities.Image;
import edu.fpt.ofbs.repositories.ImageRepository;
//import edu.fpt.ofbs.service.ImageService;

@Service
public class ImageService{

	@Autowired
	private ImageRepository imageRepository;
	
	public Image store(MultipartFile file, String userId, String dishId, String serviceId, String comboId,
			String restaurantId, String promotionId, String typeId) throws IOException{
		
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			
		    Image image = new Image();
//		    image.setName(fileName);
//		    image.setValue(file.getBytes());
//		    image.setUserId(userId);
//		    image.setDishId(dishId);
//		    image.setServiceId(serviceId);
//		    image.setComboId(comboId);
//		    image.setRestaurantId(restaurantId);
//		    image.setPromotionId(promotionId);
//		    image.setTypeId(typeId);
//		    insert into images (name, 1, 1, value, id) 
//		    values (?, ?, ?, ?, ?)
			return imageRepository.save(image);
	}

	public Image getImage(String id) {
		return imageRepository.findById(id).get();
	}

	public Stream<Image> getAllImages() {
		return imageRepository.findAll().stream();
	}

}
