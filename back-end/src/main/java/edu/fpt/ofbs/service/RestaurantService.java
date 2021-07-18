package edu.fpt.ofbs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.fpt.ofbs.entities.ProviderType;
import edu.fpt.ofbs.entities.Restaurant;
import edu.fpt.ofbs.models.IRestaurantDTO;
import edu.fpt.ofbs.repositories.ProviderTypeRepository;
import edu.fpt.ofbs.repositories.RestaurantRepository;

@Service
@Transactional
public class RestaurantService {

	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private ProviderTypeRepository providerTypeRepository;
	
	public List<IRestaurantDTO> getRestaurantsByType(int type){
		return restaurantRepository.getRestaurantsByType(type);
	}
	
	public List<IRestaurantDTO> searchRestaurants(int type, String province, String district, String restaurantName){
		return restaurantRepository.searchRestaurants(type, province, district, restaurantName);
	}
	
	public IRestaurantDTO getRestaurantById(long id){
		return restaurantRepository.getRestaurantById(id).get(0);
	}
	
	public Restaurant findRestaurantById(long id) {
		return restaurantRepository.findById(id).get();
	}
	
	public List<ProviderType> getProviderType() {
		return providerTypeRepository.findAll();
	}
	
	public Restaurant addRestaurant(Restaurant restaurant) {
		return restaurantRepository.save(restaurant);
	}
	
	public List<IRestaurantDTO> getRestaurantByProviderId(long providerId, long statusId){
		return restaurantRepository.getRestaurantByProviderId(providerId, statusId);
	}
	
	public void updateInforRestaurant(Restaurant restaurant) {
		Restaurant res = new Restaurant(restaurant.getId(), restaurant.getProvider(),
				restaurant.getProvince(), restaurant.getDistrict(), restaurant.getAddress(), 
				restaurant.getPhoneNumber(), findRestaurantById(restaurant.getId()).getBussinessLicenseId(), 
				restaurant.getRestaurantName(), restaurant.getStatus(), restaurant.getDescription(), 
				restaurant.getSize(), restaurant.getProviderType());
		
		restaurantRepository.save(res);
	}
	
	public List<IRestaurantDTO> getRestaurantPending(){
		return restaurantRepository.getRestaurantPending();
	}
	
	public void updateStatusRestaurant(long restaurantId, String status, String statusUpdate) {
		restaurantRepository.updateStatusRestaurant(restaurantId, status, statusUpdate);
	}
	
	public String getProviderPhoneLoginFromRestaurantId(long restaurantId) {
		return restaurantRepository.getProviderPhoneLoginFromRestaurantId(restaurantId);
	}
	
	public int getTotalRestaurantsByStatus(String status) {
		return restaurantRepository.getTotalRestaurantsByStatus(status);
	}
	
	public long getProviderIdByPhoneNumber(String phoneNumber) {
		return restaurantRepository.getProviderIdByPhoneNumber(phoneNumber);
	}
}
