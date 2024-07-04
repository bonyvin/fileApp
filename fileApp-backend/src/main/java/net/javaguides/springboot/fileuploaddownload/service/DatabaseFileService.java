package net.javaguides.springboot.fileuploaddownload.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;

import javax.xml.crypto.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import net.javaguides.springboot.fileuploaddownload.exception.FileNotFoundException;
import net.javaguides.springboot.fileuploaddownload.exception.FileStorageException;
import net.javaguides.springboot.fileuploaddownload.model.Base64File;
import net.javaguides.springboot.fileuploaddownload.model.DatabaseFile;
import net.javaguides.springboot.fileuploaddownload.service.repository.Base64FileRepository;
import net.javaguides.springboot.fileuploaddownload.service.repository.DatabaseFileRepository;

@Service
public class DatabaseFileService {

    @Autowired
    private DatabaseFileRepository dbFileRepository;
    
    @Autowired
    private Base64FileRepository dbBase64FileRepository;

    public DatabaseFile storeFile(MultipartFile file) {
        DatabaseFile dbFile = new DatabaseFile();
        dbFile.setRequestTime(LocalDateTime.now(ZoneOffset.UTC));;

        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            LocalDateTime responseTime = LocalDateTime.now();
            dbFile.setFileName(fileName);
            dbFile.setFileType( file.getContentType());
            dbFile.setData(file.getBytes());
            dbFile.setResponseTime(LocalDateTime.now(ZoneOffset.UTC));;

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
        
    }

//    public DatabaseFile getFile(String fileId) {
//        return dbFileRepository.findById(fileId)
//                .orElseThrow(() -> new FileNotFoundException("File not found with id " + fileId));
//    }
    public Base64File convertFileToBase64(MultipartFile file ) throws IOException {    	
        Base64File dbFile = new Base64File();
        dbFile.setRequestTime(LocalDateTime.now(ZoneOffset.UTC));;
        byte[] fileBytes = file.getBytes();
        String base64String = Base64.getEncoder().encodeToString(fileBytes);
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        LocalDateTime responseTime = LocalDateTime.now();
        dbFile.setFileName(fileName);
        dbFile.setFileType( file.getContentType());
        dbFile.setBase64Data(base64String);
        dbFile.setResponseTime(LocalDateTime.now(ZoneOffset.UTC));;
        return dbBase64FileRepository.save(dbFile);
    }
    
}
