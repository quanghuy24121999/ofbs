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
public class NotificationDTO {
	private long id;
	
	private String content;
	
	private String customer_id;
	
	private String provider_id;
	
	private Date date;
	
	private String type;
}
