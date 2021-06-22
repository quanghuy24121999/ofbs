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
	private long combo_id;
	
	private String image_combo_id;
	
	private String combo_name;
	
	private float combo_price;
}
