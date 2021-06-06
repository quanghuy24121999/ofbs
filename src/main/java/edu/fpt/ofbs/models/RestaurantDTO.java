package edu.fpt.ofbs.models;

public class RestaurantDTO {
	private int id;
	private String name;
	private String restaurantName;
	private String image;
	private String province;
	private int size;
	private float rate;
	
	public RestaurantDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RestaurantDTO(int id, String name, String restaurantName, String image, String province, int size,
			float rate) {
		super();
		this.id = id;
		this.name = name;
		this.restaurantName = restaurantName;
		this.image = image;
		this.province = province;
		this.size = size;
		this.rate = rate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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
