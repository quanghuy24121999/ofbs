package edu.fpt.ofbs.models;

import java.util.Date;

public interface IOrderDTO {
	String getRestaurant_name();

	String getImage_restaurant_id();

	long getOrder_id();

	Date getOrder_date();

	String getRestaurant_type();

	String getTime();

	float getAmount();

	String getOrder_status();
	
	Date getOrganize_date();
	
	String getOrder_code();
}
