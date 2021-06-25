package edu.fpt.ofbs.models;

import java.util.Date;

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
public class PromotionDTO {
	private long promotion_id;
	
	private long restaurant_id;
	
	private String promotion_name;
	
	private String description;
	
	private String image_id;
	
	private Date start_date;
	
	private Date end_date;
	
	private String promotion_status;
}
