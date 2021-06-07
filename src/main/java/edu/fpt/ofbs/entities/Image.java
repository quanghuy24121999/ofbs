package edu.fpt.ofbs.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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

	@ManyToOne
	@JoinColumn(name = "restaurant_id", referencedColumnName = "id")
	private Restaurant restaurant;

	@Column(name = "promotion_id")
	private String promotionId;

	@OneToOne
	@JoinColumn(name = "type_id", referencedColumnName = "id")
	private ImageType imageType;

	public Image() {
		super();
	}

	public Image(String name, byte[] value, String userId, String dishId, String serviceId, String comboId,
			Restaurant restaurant, String promotionId, ImageType imageType) {
		super();
		this.name = name;
		this.value = value;
		this.userId = userId;
		this.dishId = dishId;
		this.serviceId = serviceId;
		this.comboId = comboId;
		this.restaurant = restaurant;
		this.promotionId = promotionId;
		this.imageType = imageType;
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

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public String getPromotionId() {
		return promotionId;
	}

	public void setPromotionId(String promotionId) {
		this.promotionId = promotionId;
	}

	public ImageType getType() {
		return imageType;
	}

	public void setType(ImageType typeId) {
		this.imageType = typeId;
	}

}
