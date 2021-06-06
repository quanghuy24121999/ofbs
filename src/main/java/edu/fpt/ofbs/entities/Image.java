package edu.fpt.ofbs.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity(name = "image")
@Table(name = "images")
public class Image {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	@Column(name = "name")
	private String name;

	@Lob
	private byte[] value;
	
	@Column(name = "user_id")
	private String userId;
	
	@Column(name = "dish_id")
	private String dishId;
	
	@Column(name = "service_id")
	private String serviceId;
	
	@Column(name = "combo_id")
	private String comboId;
	
	@Column(name = "restaurant_id")
	private String restaurantId;
	
	@Column(name = "promotion_id")
	private String promotionId;
	
	@Column(name = "type_id")
	private String typeId;

	public Image() {
		super();
	}

	public Image(String name, byte[] value, String userId, String dishId, String serviceId, String comboId,
			String restaurantId, String promotionId, String typeId) {
		super();
		this.name = name;
		this.value = value;
		this.userId = userId;
		this.dishId = dishId;
		this.serviceId = serviceId;
		this.comboId = comboId;
		this.restaurantId = restaurantId;
		this.promotionId = promotionId;
		this.typeId = typeId;
	}

	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getValue() {
		return value;
	}

	public void setValue(byte[] value) {
		this.value = value;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDishId() {
		return dishId;
	}

	public void setDishId(String dishId) {
		this.dishId = dishId;
	}

	public String getServiceId() {
		return serviceId;
	}

	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}

	public String getComboId() {
		return comboId;
	}

	public void setComboId(String comboId) {
		this.comboId = comboId;
	}

	public String getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(String restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getPromotionId() {
		return promotionId;
	}

	public void setPromotionId(String promotionId) {
		this.promotionId = promotionId;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	
}
