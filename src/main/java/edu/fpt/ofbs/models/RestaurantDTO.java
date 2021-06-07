package edu.fpt.ofbs.models;

public class RestaurantDTO {
	private int restaurant_id;
	private String image_type;
	private String name;
	private String restaurantName;
	private String image_id;
	private String province;
	private int size;
	private float rate;
	
	public RestaurantDTO() {
		super();
		// TODO Auto-generated constructor stub
	}	

	public RestaurantDTO(int restaurant_id, String image_type, String name, String restaurantName, String image_id,
			String province, int size, float rate) {
		super();
		this.restaurant_id = restaurant_id;
		this.image_type = image_type;
		this.name = name;
		this.restaurantName = restaurantName;
		this.image_id = image_id;
		this.province = province;
		this.size = size;
		this.rate = rate;
	}



	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}


	public int getRestaurant_id() {
		return restaurant_id;
	}

	public void setRestaurant_id(int restaurant_id) {
		this.restaurant_id = restaurant_id;
	}

	public String getImage_type() {
		return image_type;
	}

	public void setImage_type(String image_type) {
		this.image_type = image_type;
	}

	public String getImage_id() {
		return image_id;
	}

	public void setImage_id(String image_id) {
		this.image_id = image_id;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public float getRate() {
		return rate;
	}

	public void setRate(float rate) {
		this.rate = rate;
	}
	
}
