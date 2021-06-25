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
public class OrderDTO {
	private String restaurant_name;
	
	private String image_restaurant_id;
	
	private long order_id;
	
	private Date order_date;
	
	private String restaurant_type;
	
	private String time;
	
	private float amount;
	
	private String order_status;
	
	private Date organize_date;
	
	private String order_code;
}
