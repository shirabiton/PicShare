package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import com.example.demo.service.MapStructMappper;
import com.example.demo.service.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController   // מאפר לתת כתובת לפונקציות
@RequestMapping("/api/user")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT , RequestMethod.DELETE  })
// מסיר הבטחה משום שהשרת שלנו לא מאובטח וכך כשמסירים את ההבטחה ניתן לגשת אליו
public class UserController {

    private UserRepository userRepository;

    private MapStructMappper mapper;

    private static String UPLOAD_DIRECTORY=System.getProperty("user.dir")+"\\images\\";


    @Autowired
    public UserController(UserRepository userRepository, MapStructMappper mapper) {
        this.userRepository=userRepository;
        this.mapper=mapper;
    }

    // הוספת משתמש חדש
    @PostMapping("/createUser")
        public ResponseEntity<User> createUser(@RequestBody User u){
            User user=userRepository.findByEmail(u.getEmail());
            if(user==null)
            {
                User newUser=userRepository.save(u);
                return new ResponseEntity<>(newUser, HttpStatus.CREATED);

            }
            else if(user!=null)
            {
                return new ResponseEntity<>(null, HttpStatus.CONFLICT);
            }
            else{
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateSharing(@PathVariable long id, @RequestBody User user){
        User u=userRepository.findById(id).orElse(null);
        if(user!=null)
        {
            u.setEmail(user.getEmail());
            u.setFirstName(user.getFirstName());
            u.setPassword(user.getPassword());
            u.setLastName(user.getLastName());
            u.setId(user.getId());
            u.setSharings(user.getSharings());
            u.setComments(user.getComments());

            userRepository.save(u);
            return new ResponseEntity<>(u,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity deleteUser(@PathVariable long id){
        try{
            userRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<List<User>> getUser(){
        try{
            List<User> user=new ArrayList<>();
            userRepository.findAll().forEach(u->user.add(u));
            return new ResponseEntity<>(user , HttpStatus.OK);
        }
        catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUser(@PathVariable long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else { //יחזיר שגיאה 404
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/uploadUser")
    public ResponseEntity uploadUserWithImage(@RequestPart("image") MultipartFile file, @RequestPart("user") User u){
        try{
            String filePath=UPLOAD_DIRECTORY+file.getOriginalFilename();
            Path fileName= Paths.get(filePath); // הנתיב בו נשמור את התמונה
            Files.write(fileName, file.getBytes());
            u.setImage(filePath);
            User newSharing=userRepository.save(u);
            return new ResponseEntity(newSharing, HttpStatus.CREATED);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity(u, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    @GetMapping("/getDTO/{id}")
//        public ResponseEntity<UserDTO>getDTO(@PathVariable long id) throws IOException {
//            User u=userRepository.findById(id).orElse(null);
//            if(u!=null){
//                // המרת u ל DTO
//                return new ResponseEntity<>(mapper.userToDTO(u), HttpStatus.OK);
//            }
//            else{
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//
//        }

    @PostMapping("/signIn")
    public ResponseEntity <User> check(@RequestBody User u) throws IOException {
        User user=userRepository.findByEmail(u.getEmail());
//        System.out.println(user);
        if(user!=null && user.getPassword().equals(u.getPassword())){//mail & pass correct
            return new ResponseEntity<>(user,HttpStatus.OK);//200
        }
        else if(user!=null){//mail correct & pass uncorrect
            return new ResponseEntity<>(user,HttpStatus.CREATED);//201- יחזור סטטוס לא שגיאה אבל גם לא אוקי
        }
        else//mail&password uncorrect- send to Sign UP
            return new ResponseEntity<>(HttpStatus.ACCEPTED);//202
    }



}
