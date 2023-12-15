package com.ecommerce.imageserver.utils;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Random;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.imageserver.exception.FileFormatException;

@Component
public class ImageServerUtils {
	public void createFolder(Path root) {
		try {
			Files.createDirectories(root);
		} catch (IOException e) {
			throw new RuntimeException("Could not initialize folder for upload!");
		}
	}

	public String save(MultipartFile file,Path root) throws FileFormatException{
		createFolder(root);
		if (isImageFile(file)) {

			try {
				String fileName = generateRandomString() + "."
						+ getFileExtenstion(file.getOriginalFilename());
				Files.copy(file.getInputStream(), root.resolve(fileName));
				return "http://localhost:8089/api/images/" + fileName;
			} catch (Exception e) {
				if (e instanceof FileAlreadyExistsException) {
					throw new FileFormatException("A file of that name already exists." + file.getOriginalFilename());
				}
				throw new RuntimeException(e.getMessage());
			}
		} else {
			throw new FileFormatException("Invalid File Format" + file.getOriginalFilename());
		}
	}
	
	public String generateRandomString() {
		int leftLimit = 48; // numeral '0'
		int rightLimit = 122; // letter 'z'
		int targetStringLength = 16;
		Random random = new Random();

		String generatedString = random.ints(leftLimit, rightLimit + 1)
				.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)).limit(targetStringLength)
				.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();

		System.out.println(generatedString);
		return generatedString;
	}

	public boolean isImageFile(MultipartFile file) {
		String contentType = file.getContentType();
		String fileExtension = getFileExtenstion(file.getOriginalFilename());

		if (contentType != null && contentType.startsWith("image/")) {
			return true;
		}
		if (fileExtension != null) {
			String lowercaseExtension = fileExtension.toLowerCase();
			return lowercaseExtension.equals("jpg") || lowercaseExtension.equals("jpeg")
					|| lowercaseExtension.equals("png") || lowercaseExtension.equals("gif")
					|| lowercaseExtension.equals("bmp") || lowercaseExtension.equals("jfif");
		}

		return false;
	}

	public String getFileExtenstion(String fileName) {
		if (fileName != null && fileName.lastIndexOf(".") != -1) {
			return fileName.substring(fileName.lastIndexOf(".") + 1);
		}
		return null;
	}
}
