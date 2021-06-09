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
public class ComboDTO {
	private int combo_id;
	
	private String image_combo_id;
	
	private String combo_name;
	
	private int dish_id;
	
	private String dish_name;
	
	private int menu_category_id;
	
	private float combo_price;
}
