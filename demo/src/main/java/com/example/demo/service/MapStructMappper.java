package com.example.demo.service;

import com.example.demo.dto.SharingDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.Sharing;
import com.example.demo.model.User;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMappper {

    // באופן אוטומטי ידע להחזיר גם רשימה כזאת על ידי שימוש בפונקציה כמו שכתבנו למטה
    List<SharingDTO>sharingToDTO(List<Sharing> sharings);
//    List<UserDTO>userToDTO(List<User> users);


    // ניתן לכתוב כאן כל מיני פונקציות ששייכות להמרה בין המחלקות
    @IterableMapping(qualifiedByName = "ToDTOFromSharing")
    default SharingDTO sharingToDTO(Sharing s) throws IOException {
        SharingDTO sharingDTO=new SharingDTO();
        sharingDTO.setId(s.getId());
        sharingDTO.setCategory(s.getCategory());
        sharingDTO.setDescription(s.getDescription());
        sharingDTO.setScore(s.getScore());
        sharingDTO.setTitle(s.getTitle());
        sharingDTO.setDateUpload(s.getDateUpload());
        sharingDTO.setUser(s.getUser());

        // כאן נוכל לבצע את ההמרה של התמונה שלנו לביטים כדי שיועברו לריאקט בהצלחה
        Path fileName= Paths.get(s.getImage());
        // הופך את התמונה למערך של ביטים
        byte[] byteImage=Files.readAllBytes(fileName);
        sharingDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
        return sharingDTO;
    }

    @Named("ToDTOFromSharing")
    default SharingDTO singleSharingToDTO(Sharing s) throws IOException {
        SharingDTO sharingDTO=new SharingDTO();
        sharingDTO.setId(s.getId());
        sharingDTO.setCategory(s.getCategory());
        sharingDTO.setDescription(s.getDescription());
        sharingDTO.setScore(s.getScore());
        sharingDTO.setTitle(s.getTitle());
        sharingDTO.setDateUpload(s.getDateUpload());
        sharingDTO.setUser(s.getUser());

        // כאן נוכל לבצע את ההמרה של התמונה שלנו לביטים כדי שיועברו לריאקט בהצלחה
        Path fileName= Paths.get(s.getImage());
        // הופך את התמונה למערך של ביטים
        byte[] byteImage=Files.readAllBytes(fileName);
        sharingDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
        return sharingDTO;
    }

//    default SharingDTO singleSharingToDTO(Sharing s) {
//        SharingDTO sharingDTO = new SharingDTO();
//        sharingDTO.setId(s.getId());
//        sharingDTO.setCategory(s.getCategory());
//        sharingDTO.setDescription(s.getDescription());
//        sharingDTO.setScore(s.getScore());
//        sharingDTO.setTitle(s.getTitle());
//        sharingDTO.setDateUpload(s.getDateUpload());
//        sharingDTO.setUser(s.getUser());
//
//        try {
//            Path fileName = Paths.get(s.getImage());
//            byte[] byteImage = Files.readAllBytes(fileName);
//            sharingDTO.setImage(Base64.getEncoder().encodeToString(byteImage));
//        } catch (IOException e) {
//            // Handle the IOException (log, set default image, or rethrow)
//            // For demonstration purposes:
//            e.printStackTrace();
//            // You can set a default image or handle the exception according to your use case
//            sharingDTO.setImage(""); // Set an empty image or default image
//        }
//
//        return sharingDTO;
//    }


//    default UserDTO userToDTO(User u) throws IOException {
//        UserDTO userDTO=new UserDTO();
//        userDTO.setId(u.getId());
//        userDTO.setFirstName(u.getFirstName());
//        userDTO.setLastName(u.getLastName());
//        userDTO.setEmail(u.getEmail());
//        userDTO.setPassword(u.getPassword());
//
//        // כאן נוכל לבצע את ההמרה של התמונה שלנו לביטים כדי שיועברו לריאקט בהצלחה
//        Path fileName= Paths.get(u.getImage());
//        // הופך את התמונה למערך של ביטים
//        byte[] byteImage=Files.readAllBytes(fileName);
//        userDTO.setImage(Base64.getEncoder().encode(byteImage));
//        return userDTO;
//    }
}
