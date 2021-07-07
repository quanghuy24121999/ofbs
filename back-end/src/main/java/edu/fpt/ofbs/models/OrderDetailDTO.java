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
public class OrderDetailDTO {
	private long restaurant_id;
	
	private String restaurant_name;
	
	private String province;
	
	private String image_restaurant_id;
	
	private String restaurant_type;
	
	private long order_id;
	
	private Date order_date;
	
	private String time;
	
	private Date organize_date;
	
	private String order_status;
	
	private long customer_id;
	
	private String phone_number;
	
	private int number_of_guests;
	
	private int table_type;
	
	private String note;
	
	private float total_amount;
	
	private String promotion_name;
	
	private String dish_id;
	
	private String dish_name;
	
	private String combo_id;
	
	private String combo_name;
	
	private String service_id;
	
	private String service_name;
	
	private float price;
	
	private int quantity;
	
	private String order_code;
}
