package edu.fpt.ofbs.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import edu.fpt.ofbs.entities.Image;
import edu.fpt.ofbs.message.ResponseFile;

import edu.fpt.ofbs.message.ResponseMessage;
import edu.fpt.ofbs.service.ImageService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/images")
public class ImageController {

	@Autowired
	private ImageService imageService;

	@PostMapping("/upload")
	public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file,
			@RequestParam("userId") String userId, @RequestParam("dishId") String dishId,
			@RequestParam("serviceId") String serviceId, @RequestParam("comboId") String comboId,
			@RequestParam("restaurantId") String restaurantId, @RequestParam("promotionId") String promotionId,
			@RequestParam("typeId") String typeId) {
		String message = "";
		try {
			imageService.store(file, userId, dishId, serviceId, comboId, restaurantId, promotionId, typeId);

			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}

	@GetMapping("/getImages")
	public ResponseEntity<List<ResponseFile>> getListFiles() {
		List<ResponseFile> files = imageService.getAllImages().map(dbFile -> {
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/images/")
					.path(dbFile.getId()).toUriString();

			return new ResponseFile(dbFile.getName(), fileDownloadUri, dbFile.getValue().length);
		}).collect(Collectors.toList());

		return ResponseEntity.status(HttpStatus.OK).body(files);
	}

	@GetMapping("/{id}")
	public ResponseEntity<byte[]> getFile(@PathVariable String id) {
		Image img = imageService.getImage(id);

		return ResponseEntity.ok()
	    		.contentType(MediaType.IMAGE_PNG)
	    		.body(img.getValue());
	}
}
