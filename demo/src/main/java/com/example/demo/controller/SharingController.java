package com.example.demo.controller;

import com.example.demo.dto.SharingDTO;
import com.example.demo.model.Sharing;
import com.example.demo.service.MapStructMappper;
import com.example.demo.service.SharingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/sharings")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class SharingController {

    private SharingRepository sharingRepository;
    private MapStructMappper mapper;

    //פונקציה שפונה לפרויקט שלי
    private static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "\\images\\";

    @Autowired
    public SharingController(SharingRepository sharingRepository, MapStructMappper mapper) {
        this.sharingRepository = sharingRepository;
        this.mapper = mapper;
    }

    @GetMapping("/get")
    public ResponseEntity<List<SharingDTO>> getSharings() {
        try {
            List<Sharing> sharings = new ArrayList<>();
            sharingRepository.findAll().forEach(c -> sharings.add(c));
            return new ResponseEntity<>(mapper.sharingToDTO(sharings), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }        // אמורים לחזור כ json
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SharingDTO> getSharingById(@PathVariable long id) throws IOException {
        Sharing sharing = sharingRepository.findById(id).orElse(null); //אם לא נמצא יחזיר NULL
        if (sharing != null) {
            return new ResponseEntity<>(mapper.singleSharingToDTO(sharing), HttpStatus.OK);
        } else { //יחזיר שגיאה 404
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Sharing> updateSharing(@PathVariable long id, @RequestBody Sharing sharing) {
        Sharing s = sharingRepository.findById(id).orElse(null);
        if (sharing != null) {
            s.setCategory(sharing.getCategory());
            s.setTitle(sharing.getTitle());
            s.setDescription(sharing.getDescription());
            s.setImage(sharing.getImage());
            s.setScore(sharing.getScore());
            sharingRepository.save(s);
            return new ResponseEntity<>(s, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(s, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteSharing(@PathVariable long id) {
        try {
            sharingRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // להעלות פוסט עם התמונה שלו
    @PostMapping("/uploadSharing")
    public ResponseEntity uploadSharingWithImage(@RequestPart("image") MultipartFile file, @RequestPart("sharing") Sharing s) {
        try {
            s.setDateUpload(LocalDate.now());
            String filePath = UPLOAD_DIRECTORY + file.getOriginalFilename();
            Path fileName = Paths.get(filePath); // הנתיב בו נשמור את התמונה
            Files.write(fileName, file.getBytes());
            s.setImage(filePath);
            Sharing newSharing = sharingRepository.save(s);
            return new ResponseEntity(newSharing, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity(s, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getDTO/{id}")
    public ResponseEntity<SharingDTO> getDTO(@PathVariable long id) throws IOException {
        Sharing s = sharingRepository.findById(id).orElse(null);
        if (s != null) {
            // המרת s ל DTO
            return new ResponseEntity<>(mapper.sharingToDTO(s), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}

