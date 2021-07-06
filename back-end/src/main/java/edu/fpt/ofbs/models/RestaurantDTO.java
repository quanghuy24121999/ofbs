package edu.fpt.ofbs.models;

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
public class RestaurantDTO {
	private long restaurant_id;
	
	private String image_type;
	
	private String restaurant_type;
	
	private String restaurant_name;
	
	private String image_id;
	
	private String province;
	
	private int size;
	
	private float rate;
	
	private String description;
	
	private String restaurant_status;
	
	private long provider_id;
}
