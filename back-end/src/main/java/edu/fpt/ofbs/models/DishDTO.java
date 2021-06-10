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
	private int id;
	
	private String dish_name;
	
	private String image_dish_id;
	
	private float price;
}
