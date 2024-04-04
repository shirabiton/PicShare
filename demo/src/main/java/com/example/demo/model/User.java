package com.example.demo.model;

import java.util.regex.*;

import com.example.demo.model.Comment;
import com.example.demo.model.Sharing;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity

@Table(name = "users")
public class User {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "user") // לכל משתמש הרבה שיתופים
    private List<Sharing> sharings;

    @JsonIgnore
    @OneToMany(mappedBy = "user") // לכל משתמש הרבה תגובות
    private List<Comment> comments;

    public User() {

    }

    public User(String firstName, String lastName, String email, String password, String image) {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setPassword(password);
        setImage(image);
    }

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<Sharing> getSharings() {
        return sharings;
    }

    public void setSharings(List<Sharing> sharings) {
        this.sharings = sharings;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    //    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        boolean isValid = true;
//        if (firstName.length() == 0)
//            isValid = false;
//        else {
//            for (int i = 0; i < firstName.length(); i++) {
//                if (!Character.isAlphabetic(firstName.charAt(i))) {
//                    isValid = false;
//                    break;
//                }
//            }
//        }
//        if (isValid)
//            this.firstName = firstName;
//        else
//            System.out.println("שם המשתמש אינו תקין");
//    }
//
//    public String getLastName() {
//        return this.lastName;
//    }
//
//    public void setLastName(String lastName) {
//        boolean isValid = true;
//        if (lastName.length() == 0)
//            isValid = false;
//        else {
//            for (int i = 0; i < lastName.length(); i++) {
//                if (!Character.isAlphabetic(lastName.charAt(i))) {
//                    isValid = false;
//                    break;
//                }
//            }
//        }
//        if (isValid)
//            this.lastName = lastName;
//        else
//            System.out.println("שם המשתמש אינו תקין");
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        String regex = "^[\\w!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&amp;'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
//        Pattern pattern = Pattern.compile(regex);
//        Matcher matcher = pattern.matcher(email);
//        if (matcher.matches())
//            System.out.println("כתובת מייל לא תקינה");
//        else
//            this.email = email;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    public void setPhone(String phone) {
//        boolean isValid = true;
//        if (phone.length() != 10)
//            isValid = false;
//        else {
//            for (int i = 0; i < 10; i++) {
//                if (phone.charAt(i) < '0' || phone.charAt(i) > '9')
//                    isValid = false;
//                break;
//            }
//        }
//        if (isValid)
//            this.phone = phone;
//        else
//            System.out.println("מספר הפלאפון אינו תקין");
//    }

//    public void setPassword(String password) {
//        String regex = "^(?=.*[0-9])"+ "(?=.*[a-z])(?=.*[A-Z])"+ "(?=.*[@#$%^&+=])" + "(?=\\S+$).{8,20}$";
//        Pattern pattern = Pattern.compile(regex);
//        Matcher matcher = pattern.matcher(password);
//        if(matcher.matches())
//            this.password = password;
//        else
//            System.out.println("סיסמא לא תקינה");

//        תקינות הסיסמא:
//        מכילה לפחות 8 תווים ולכל היותר 20 תווים.
//        מכילה לפחות ספרה אחת.
//        מכילה לפחות אלפבית אחד גדול.
//        מכילה לפחות אלפבית קטן אחד.
//        מכילה לפחות תו מיוחד אחד הכולל !@#$%&*()-+=^.
//        אינה מכילה רווח לבן.

//    }
}
