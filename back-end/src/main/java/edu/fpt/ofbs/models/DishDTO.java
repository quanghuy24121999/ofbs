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
public class DishDTO {
	private long id;
	
	private String dish_name;
	
	private String image_dish_id;
	
	private float price;
	
	private long restaurant_id;
	
	private String category_name;
	
	private String status_name;
}
