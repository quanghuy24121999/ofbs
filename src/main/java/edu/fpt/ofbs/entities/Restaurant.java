package edu.fpt.ofbs.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity(name = "restaurant")
@Table(name = "provider_restaurants")
public class Restaurant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "provider_id")
	private int providerId;
	
	private String province;
	
	private String district;
	
	private String address;
	
	@Column(name = "phone_number")
	private String phoneNumber;
	
	@Column(name = "bussiness_license_id")
	private String bussinessLicenseId;
	
	@Column(name = "restaurant_name")
	private String restaurantName;
	
	@Column(name = "status_id")
	private int statusId;
	
	private String description;
	
	private int size;
	
	@OneToOne
	@JoinColumn(name = "provider_type_id", referencedColumnName = "id")
	private ProviderType providerType;

	public Restaurant() {
		super();
	}

	public Restaurant(int id, int providerId, String province, String district, String address, String phoneNumber,
			String bussinessLicenseId, String restaurantName, int statusId, String description, int size,
			ProviderType providerType) {
		super();
		this.id = id;
		this.providerId = providerId;
		this.province = province;
		this.district = district;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.bussinessLicenseId = bussinessLicenseId;
		this.restaurantName = restaurantName;
		this.statusId = statusId;
		this.description = description;
		this.size = size;
		this.providerType = providerType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProviderId() {
		return providerId;
	}

	public void setProviderId(int providerId) {
		this.providerId = providerId;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getBussinessLicenseId() {
		return bussinessLicenseId;
	}

	public void setBussinessLicenseId(String bussinessLicenseId) {
		this.bussinessLicenseId = bussinessLicenseId;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public int getStatusId() {
		return statusId;
	}

	public void setStatusId(int statusId) {
		this.statusId = statusId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public ProviderType getProviderType() {
		return providerType;
	}

	public void setProviderType(ProviderType providerType) {
		this.providerType = providerType;
	}
	
}
