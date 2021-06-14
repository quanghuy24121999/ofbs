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
public class UserDTO {
	private String user_name;
	
	private String image_id;
	
	private String email;
	
	private String phone_number;
	
	private boolean gender;
	
	private Date date_of_birth;
	
	private String address;
}
