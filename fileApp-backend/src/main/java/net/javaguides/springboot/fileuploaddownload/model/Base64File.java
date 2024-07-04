package net.javaguides.springboot.fileuploaddownload.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "files_base64")
public class Base64File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Base64File(Long id, String fileName, String fileType, String base64Data, LocalDateTime requestTime,
			LocalDateTime responseTime) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.fileType = fileType;
		this.base64Data = base64Data;
		this.requestTime = requestTime;
		this.responseTime = responseTime;
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

	private String fileName;
    private String fileType;
    private String base64Data;
	private LocalDateTime requestTime;
	private LocalDateTime responseTime;

    // Constructors, getters, and setters
    public Base64File() {}

    public Base64File(String fileName, String fileType, String base64Data ) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.base64Data = base64Data;
 
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getBase64Data() {
        return base64Data;
    }

    public void setBase64Data(String base64Data) {
        this.base64Data = base64Data;
    }
}
