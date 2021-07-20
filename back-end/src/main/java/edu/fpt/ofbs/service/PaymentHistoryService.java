package edu.fpt.ofbs.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.fpt.ofbs.entities.PaymentHistory;
import edu.fpt.ofbs.models.IPaymentHistoryDTO;
import edu.fpt.ofbs.repositories.PaymentHistoryRepository;
import edu.fpt.ofbs.repositories.PaymentTypeRepository;

@Service
public class PaymentHistoryService {
	@Autowired
	private PaymentHistoryRepository paymentHistoryRepository;
	
	@Autowired
	private StatusService statusService;
	
	@Autowired
	private PaymentTypeRepository paymentTypeRepository;
	
	public List<IPaymentHistoryDTO> getPaymentHistory(long userId, String paymentCode, String status, String fromDate, String toDate){
		return paymentHistoryRepository.getPaymentHistory(userId, paymentCode, status, fromDate, toDate);
	}
	
	public void updatePaymentStatus(long paymentHistoryId, String status) {
		paymentHistoryRepository.updatePaymentStatus(paymentHistoryId, status);
	}
	
	public PaymentHistory save(PaymentHistory paymentHistory) {
		PaymentHistory savePaymentHistory = new PaymentHistory();
		
		savePaymentHistory.setUser(paymentHistory.getUser());
		savePaymentHistory.setBalaceChange(paymentHistory.getBalaceChange());
		savePaymentHistory.setFromToUser(paymentHistory.getFromToUser());
		savePaymentHistory.setCurrentBalance(paymentHistory.getCurrentBalance());
		savePaymentHistory.setDateOfChange(paymentHistory.getDateOfChange());
		savePaymentHistory.setDescription(paymentHistory.getDescription());
		savePaymentHistory.setStatus(statusService.findStatusByName("pending"));
		
		Date paymentDate = new Date();
		savePaymentHistory.setPaymentCode("FBS" + paymentDate.getTime());
		
		savePaymentHistory.setPaymentType(paymentTypeRepository.findPaymentTypeByName(paymentHistory.getPaymentType().getName()));
		
		return paymentHistoryRepository.save(savePaymentHistory);
	}
}
