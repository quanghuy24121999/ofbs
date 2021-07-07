package edu.fpt.ofbs.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.Notification;
import edu.fpt.ofbs.models.INotificationDTO;
import edu.fpt.ofbs.repositories.NotificationRepository;

@Service
public class NotificationService {
	@Autowired
	private NotificationRepository notificationRepository;
	
	public Notification save(Notification notification) {
		if(notification.getDate() == null) {
			notification.setDate(new Date());
		}
		
		return notificationRepository.save(notification);
	}
	
	public List<INotificationDTO> getNotifications(long customerId, long providerId, boolean isAdmin) {
		return notificationRepository.getNotifications(customerId, providerId, isAdmin);
	}
	
	public Notification getNotificationById(long id) {
		return notificationRepository.findById(id).get();
	}
}
