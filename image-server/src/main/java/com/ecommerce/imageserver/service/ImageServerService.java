package com.ecommerce.imageserver.service;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.imageserver.exception.FileFormatException;
import com.ecommerce.imageserver.utils.ImageServerUtils;

@Service
public class ImageServerService {

	@Autowired
	private ImageServerUtils imageServerUtils;
	private final Path root = Paths.get("./uploads");
	private static final Logger LOGGER = LoggerFactory.getLogger(ImageServerService.class);

	public ResponseEntity<Resource> loadImage(String filename) {
		try {
			Path file = root.resolve(filename);
			Resource resource = new UrlResource(file.toUri());

			if (resource.exists() || resource.isReadable()) {
				LOGGER.info("Returning {} ", filename);
				HttpHeaders headers = new HttpHeaders();
				headers.add("content-disposition", "inline;filename=" + resource.getFilename());
				return ResponseEntity.ok().headers(headers).body(resource);

			} else {
				LOGGER.error("Could not read the file {}", filename);
				throw new RuntimeException("Could not read the file!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("Error: " + e.getMessage());
		}

	}

	public List<String> saveMultipleImages(MultipartFile[] files) throws FileFormatException {
		List<String> imageList = new ArrayList<String>();

		for (MultipartFile file : files) {
			imageList.add(imageServerUtils.save(file, root));
		}
		return imageList;
	}

	public ResponseEntity<String> saveImage(MultipartFile file) throws FileFormatException {
		return ResponseEntity.ok(imageServerUtils.save(file, root));

	}

	public String updateImage(MultipartFile file) throws FileFormatException {
		String fileName = file.getOriginalFilename();
		boolean isDeleted = deleteImage(fileName);
		if (isDeleted) {
			return imageServerUtils.save(file, root);
		} else {
			throw new FileFormatException("Unable Update Image File {}" + file.getOriginalFilename());
		}
	}

	public boolean deleteImage(String fileName) {
		Path file = root.resolve(fileName);
		return FileSystemUtils.deleteRecursively(file.toFile());
	}

	public void deleteAll() {
		FileSystemUtils.deleteRecursively(root.toFile());
	}

}
