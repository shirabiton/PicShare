package com.example.demo.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity // המחלקה הזאת תהפך לטבלה
@Table(name = "sharings")
public class Sharing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String image;
    private LocalDate dateUpload;
    private int score;

    @ManyToOne // הרבה שיתופים למשתמש אחד
    private User user;

    @ManyToOne // הרבה שיתופים לקטוגריה אחת
    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "sharing") // לכל שיתוף הרבה תגובות
    private List<Comment> comments;


    public Sharing() {

    }

    public Sharing(String title, String description, String image, User user, Category category) {
        setTitle(title);
        this.description = description;
        this.image = image;
        this.user = user;
        this.category = category;
        this.dateUpload = LocalDate.now();
        this.score = 0;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        if(title.length()<2)
            System.out.println("כותרת קצרה מידי");
        else
            this.title = title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getDateUpload() {
        return dateUpload;
    }

    public void setDateUpload(LocalDate dateUpload) {
        this.dateUpload = dateUpload;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }


}
