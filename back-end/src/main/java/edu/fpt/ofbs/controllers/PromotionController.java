package edu.fpt.ofbs.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.fpt.ofbs.models.IPromotionDTO;
import edu.fpt.ofbs.service.PromotionService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/promotions")
public class PromotionController {
	@Autowired
	private PromotionService promotionService;
	
	@GetMapping("")
	public ResponseEntity<?> searchPromotionByProvince(@PathParam("province") String province) {
		List<IPromotionDTO> promotions = promotionService.searchPromotionByProvince(province);
		return ResponseEntity.status(HttpStatus.OK).body(promotions);
	}
}
