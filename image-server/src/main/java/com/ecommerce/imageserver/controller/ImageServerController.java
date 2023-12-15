package com.ecommerce.imageserver.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.imageserver.exception.FileFormatException;
import com.ecommerce.imageserver.service.ImageServerService;

import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "CRUD REST APIs for ImageUpload Service", description = "CRUD REST APIs - Save, Load Image File")
@RestController
@RequestMapping("/api/images")
public class ImageServerController {

	@Autowired
	ImageServerService imageServerService;

	private static final Logger LOGGER = LoggerFactory.getLogger(ImageServerController.class);

	@GetMapping("/{fileName}")
	public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
		LOGGER.info("GET /api/images/fileName for image {}", fileName);
		return imageServerService.loadImage(fileName);
	}

	@PostMapping("/upload")
	public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws FileFormatException {
		LOGGER.info("POST /api/images/upload for image {}", file.getOriginalFilename());
		return imageServerService.saveImage(file);
	}

	@PostMapping("/uploadMultiple")
	public List<String> uploadImage(@RequestParam("files") MultipartFile[] files) throws FileFormatException {
		LOGGER.info("POST /api/images/uploadMultiple for uploading {} images", files.length);
		return imageServerService.saveMultipleImages(files);
	}

	@PutMapping("/update")
	public String updateImage(@RequestParam("file") MultipartFile file) throws FileFormatException {
		LOGGER.info("PUT /api/images/upload for image {}", file.getOriginalFilename());
		return imageServerService.updateImage(file);
	}

	@DeleteMapping("/delete/{fileName}")
	public String deleteImage(@PathVariable String fileName) throws FileFormatException {
		LOGGER.info("DELETE /api/images/fileName for image {}", fileName);
		imageServerService.deleteImage(fileName);
		return "Deleted Successfully";
	}

}
