package edu.fpt.ofbs.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
@Entity(name = "order_detail")
@Table(name = "order_details")
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private float price;
	
	private int quantity;
	
	@ManyToOne
	@JoinColumn(name = "dish_id", referencedColumnName = "id")
	private Dish dish;
	
	@ManyToOne
	@JoinColumn(name = "combo_id", referencedColumnName = "id")
	private Combo combo;
	
	@ManyToOne
	@JoinColumn(name = "service_id", referencedColumnName = "id")
	private Services service;
	
	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "id")
	private Order order;
}
