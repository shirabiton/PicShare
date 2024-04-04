package com.example.demo.dto;

import com.example.demo.model.Category;
import com.example.demo.model.Comment;
import com.example.demo.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

public class SharingDTO {
        private Long id;
        private String title;
        private String description;
        private String image;
        private LocalDate dateUpload;
        private int score;

        private User user;

        private Category category;

//        private List<Comment> comments;

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
        }

        public String getTitle() {
                return title;
        }

        public void setTitle(String title) {
                this.title = title;
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

//        public List<Comment> getComments() {
//                return comments;
//        }
//
//        public void setComments(List<Comment> comments) {
//                this.comments = comments;
//        }
}
