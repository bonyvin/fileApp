package net.javaguides.springboot.fileuploaddownload.controller;

import java.io.IOException;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import net.javaguides.springboot.fileuploaddownload.model.Base64File;
import net.javaguides.springboot.fileuploaddownload.model.DatabaseFile;
import net.javaguides.springboot.fileuploaddownload.payload.Response;
import net.javaguides.springboot.fileuploaddownload.service.DatabaseFileService;

@RestController
public class FileUploadController {

    @Autowired
    private DatabaseFileService fileStorageService;
    
    @Autowired
    private DatabaseFileService fileStorageServicebase64;
    @PostMapping("/uploadFile")
    public DatabaseFile uploadFile(@RequestParam("file") MultipartFile file) {
    	LocalDateTime requestTime = LocalDateTime.now();
    	DatabaseFile fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName.getFileName())
                .toUriString();

        return fileStorageService.storeFile(file);
    }

//    @PostMapping("/uploadMultipleFiles")
//    public List<Response> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
//        return Arrays.asList(files)
//                .stream()
//                .map(file -> uploadFile(file))
//                .collect(Collectors.toList());
//    }
    
    @PostMapping("/uploadBase64")
    public Base64File uploadFileBase64(@RequestParam("file") MultipartFile file) throws IOException {
//    	LocalDateTime requestTime = LocalDateTime.now();
        return fileStorageServicebase64.convertFileToBase64(file);
    }
}
