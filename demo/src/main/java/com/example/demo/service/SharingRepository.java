package com.example.demo.service;

import com.example.demo.model.Sharing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component // @Repository
// כדי שיכיר אותו ואז לא יצטרך לעשות לו new
public interface SharingRepository extends JpaRepository <Sharing, Long> {
    // crud: הפעולות שנהוג לבצע על מסד נתונים
    // create - לייצר נתונים חדשים
    // retrive -  להביא נתונים חדשים
    // update - לעדכן נתונים
    // delete - למחוק נתונים

  // מחזיר את הפוסטים של משתמש מסויים לפי פרופיל
//    public List<Sharing> findSharingByUserName(String fullName);
//
//    // מחזיר פוסטים לפי כותרת חיפוש
//    public List<Sharing> findSharingByTitle(String title);
}
