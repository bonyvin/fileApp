package net.javaguides.springboot.fileuploaddownload.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import net.javaguides.springboot.fileuploaddownload.model.Base64File;
import net.javaguides.springboot.fileuploaddownload.model.DatabaseFile;

@Repository
public interface Base64FileRepository extends JpaRepository<Base64File,Long> {

}