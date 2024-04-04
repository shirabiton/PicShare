package com.example.demo.service;

import com.example.demo.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentByIdIs(long id);
}
