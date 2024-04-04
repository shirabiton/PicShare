package com.example.demo.controller;

import com.example.demo.model.Sharing;
import com.example.demo.service.MapStructMappper;
import com.example.demo.service.SharingRepository;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Comment;
import com.example.demo.service.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/api/comments")
//@CrossOrigin (origins="*")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class CommentController {
    private CommentRepository commentRepository;
    private SharingRepository sharingRepository;

    @Autowired
    public CommentController(CommentRepository commentRepository, SharingRepository sharingRepository) {
        this.commentRepository = commentRepository;
        this.sharingRepository = sharingRepository;
    }

    public ResponseEntity<List<Comment>> getComment(@PathVariable long id) {
        try {
            List<Comment> comments = new ArrayList<>();
            commentRepository.findCommentByIdIs(id).forEach(c -> comments.add(c));
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get")
    public List<Comment> getComment() {
        return commentRepository.findAll();
        // אמורים לחזור כ json
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable long id) {
        Comment comment = commentRepository.findById(id).orElse(null); //אם לא נמצא יחזיר NULL
        if (comment != null) {
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } else { //יחזיר שגיאה 404
            return new ResponseEntity<>(comment, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/createNew")
    public ResponseEntity<Comment> createComment(@RequestBody Comment c) {
        try {
            int sumOfScore = c.getScore();
            // עדכון דירוג פוסט עפ"י תגובות
            Sharing s = sharingRepository.findById(c.getSharing().getId()).orElse(null);
                for (Comment comment : s.getComments()) {
                    sumOfScore += comment.getScore();
                }
                s.setScore(sumOfScore / (s.getComments().size()+1));

            // עדכון תאריך העלאת תגובה
            c.setDate(LocalDate.now());
            Comment newComment = commentRepository.save(c);
            return new ResponseEntity<>(newComment, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable long id, @RequestBody Comment comment) {
        Comment c = commentRepository.findById(id).orElse(null);
        if (comment != null) {
            c.setId(comment.getId());
            c.setContent(comment.getContent());
            c.setScore(comment.getScore());
            c.setUser(comment.getUser());
            c.setDate(comment.getDate());
            c.setSharing(comment.getSharing());

            commentRepository.save(c);
            return new ResponseEntity<>(c, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(c, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteComment(@PathVariable long id) {
        try {
            commentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
