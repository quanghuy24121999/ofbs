package edu.fpt.ofbs.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
@Entity(name = "order")
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private float amount;
	
	private String time;
	
	@Column(name = "order_date")
	private Date orderDate;
	
	@ManyToOne
	@JoinColumn(name = "restaurant_id", referencedColumnName = "id")
	private Restaurant restaurant;
	
	@ManyToOne
	@JoinColumn(name = "customer_id", referencedColumnName = "id")
	private User customer;
	
	@OneToOne
	@JoinColumn(name = "status_id", referencedColumnName = "id")
	private Status status;
	
	@ManyToOne
	@JoinColumn(name = "promotion_id", referencedColumnName = "id")
	private Promotion promotion;
}
