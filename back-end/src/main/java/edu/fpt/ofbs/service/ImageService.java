package edu.fpt.ofbs.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import edu.fpt.ofbs.entities.Image;
import edu.fpt.ofbs.models.IImageDTO;
import edu.fpt.ofbs.repositories.ImageRepository;

@Service
@Transactional
public class ImageService{

	@Autowired
	private ImageRepository imageRepository;
	
	public Image store(MultipartFile file, String userId, String dishId, String serviceId, String comboId,
			String restaurantId, String promotionId, String typeId) throws IOException{
		
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			
		    Image image = new Image(fileName, file.getBytes(), userId, dishId, serviceId, comboId, restaurantId, promotionId, typeId);
		    
			return imageRepository.save(image);
	}
	
	public Image update(MultipartFile file, String imageId) throws IOException{
		
			String fileName = StringUtils.cleanPath(file.getOriginalFilename());
			
			Image image = getImage(imageId);
			
		    Image newImage = new Image(fileName, file.getBytes(), image.getUserId(), image.getDishId(), image.getServiceId(), 
		    		image.getComboId(), image.getRestaurantId(), image.getPromotionId(), image.getTypeId());
		   newImage.setId(imageId);
		    
			return imageRepository.save(newImage);
	}
	
	public void delete(long userId){
		imageRepository.deleteByUserId(userId);
	}
	
	public void deleteRestaurantCertificate(long restaurantId) {
		imageRepository.deleteRestaurantCertificate(restaurantId);
	}

	public Image getImage(String id) {
		return imageRepository.findById(id).get();
	}
	
	public List<IImageDTO> getImagesByRestaurantId(long restaurantId){
		return imageRepository.getImagesByRestaurantId(restaurantId);
	}
	
	public void deleteImageById(String id) {
		imageRepository.deleteById(id);
	}
	
	public List<IImageDTO> getImagesRestaurant(long restaurantId){
		return imageRepository.getImagesRestaurant(restaurantId);
	}
}
