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
public class ServiceDTO {
	private long id;
	
	private String service_name;
	
	private String image_service_id;
	
	private float price;
	
	private long restaurant_id;
	
	private String service_category_name;
	
	private String status_name;
}
