package net.javaguides.springboot.fileuploaddownload.model;

import java.time.LocalDateTime;
 import java.util.Date;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class DatabaseFile {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;

	private String fileName;

	private String fileType;
	
	private LocalDateTime requestTime;
	
	private LocalDateTime responseTime;

	public DatabaseFile(String id, String fileName, String fileType, LocalDateTime requestTime, LocalDateTime responseTime,
			byte[] data) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.fileType = fileType;
		this.requestTime = requestTime;
		this.responseTime = responseTime;
		this.data = data;
	}

	public LocalDateTime getRequestTime() {
		return requestTime;
	}

	public void setRequestTime(LocalDateTime requestTime) {
		this.requestTime = requestTime;
	}

	public LocalDateTime getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(LocalDateTime responseTime) {
		this.responseTime = responseTime;
	}

	@Lob
	private byte[] data;

	public DatabaseFile() {

	}

	public DatabaseFile(String fileName, String fileType, byte[] data) {
		this.fileName = fileName;
		this.fileType = fileType;
		this.data = data;

	}

	public String getId() {
		return id;
	}

	public String getFileName() {
		return fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public byte[] getData() {
		return data;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public void setData(byte[] data) {
		this.data = data;
	}
}
