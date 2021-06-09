package edu.fpt.ofbs.models;

import java.util.Date;

public interface IFeedbackDTO {
	int getUser_id();

	String getUser_name();

	float getRate();

	String getFeedback_content();

	Date getFeedback_date();
	
	int getRestaurant_id();
	
	String getImage_user_id();
}
