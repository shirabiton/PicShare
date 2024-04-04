package com.example.demo.dto;

import com.example.demo.model.Comment;
import com.example.demo.model.Sharing;
import jakarta.persistence.*;

import java.util.List;

public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private byte[] image;

//        @OneToMany(mappedBy = "user") // לכל משתמש הרבה שיתופים
//        private List<Sharing> sharings;
//
//        @OneToMany(mappedBy = "user") // לכל משתמש הרבה תגובות
//        private List<Comment> comments;

//        public User() {
//
//        }
//
//        public User(String firstName, String lastName, String email, String phone, String password, String image) {
//            setFirstName(firstName);
//            setLastName(lastName);
//            setEmail(email);
//            setPhone(phone);
//            setPassword(password);
//            setImage(image);
//        }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public byte[] getImage() {
        return image;
    }
    public void setImage(byte[] image) {
        this.image = image;
    }

//
//        public List<Sharing> getSharings() {
//            return sharings;
//        }
//
//        public void setSharings(List<Sharing> sharings) {
//            this.sharings = sharings;
//        }
//


}
