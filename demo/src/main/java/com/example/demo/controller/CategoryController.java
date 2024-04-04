package com.example.demo.controller;

import com.example.demo.model.Sharing;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Category;
import com.example.demo.service.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
//@CrossOrigin(origins="*")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT , RequestMethod.DELETE  })
public class CategoryController {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository  categoryRepository){this.categoryRepository=categoryRepository;}

    @GetMapping("/getCategory")
    public ResponseEntity<List<Category>> getCategory(){
        try{
            List<Category> categories=new ArrayList<>();
            categoryRepository.findAll().forEach(c->categories.add(c));
            return new ResponseEntity<>(categories , HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Category> getSharingById(@PathVariable long id){
        Category category=categoryRepository.findById(id).orElse(null);
        if(category!=null){
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        else{ //יחזיר שגיאה 404
            return new ResponseEntity<>(category, HttpStatus.NOT_FOUND);
        }
    }

}

