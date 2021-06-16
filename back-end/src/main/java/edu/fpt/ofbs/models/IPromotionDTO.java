package edu.fpt.ofbs.models;

import java.util.Date;

public interface IPromotionDTO {
	int getPromotion_id();
	
	int getRestaurant_id();

	String getPromotion_name();

	String getDescription();

	String getImage_id();

	Date getStart_date();

	Date getEnd_date();
}
