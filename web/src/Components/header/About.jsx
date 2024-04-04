import {Typography } from '@mui/material';
import React from 'react';

export default function About() {

  return (
    <>
      <Typography variant='h4' sx={{textAlign: 'center'}}>קצת עלינו</Typography>
        <Typography variant='h5' 
        sx={{textAlign: 'center', width: '55vw', alignSelf: 'center'}}>
          PicShare -ברוכים הבאים ל
          האתר שבו הצילום הופך לאמנות, והיצירתיות היא ערך עליון.
          כאן, אנו מציעים מגוון עשיר של המלצות על צלמים וצלמות מובילים, שהם מומחים בכל סוגי הצילומים - מאירועים גדולים ועד צילומי חוץ וסטודיו.
          אנו גם מספקים מידע מקצועי על לוקיישנים מרהיבים ונופים מושלמים המתאימים לצילום, כדי שתוכלו לנצור את הרגעים הכי מרגשים בחיים בעיצוב, צבע ובסגנון.
          בנוסף, פרסמו את המלצותיכם האישיות ושתפו עם הקהילה על חוויות צילום מרתקות וייחודיות שיש לכם.
          אתם מוזמנים לשתף בטיפים, לתת עצות ולשתף במגוון המשאבים שלנו לגבי ציוד צילום, אביזרי נוי ועוד - כדי שהצילום שלכם יהיה מקצועי, מרהיב וייחודי כמו שרק אתם רוצים.
          PicShare הוא עולם שבו הצילום נע בין הפוטנציאל הטמון בכל אחד מאיתנו לבין ההשראה והיצירתיות שנוצרת בקהילה שלנו. הצטרפו אלינו והתנסו בכיף של צילום, שיתוף והשראה
        </Typography>
        <Typography variant='h5' sx={{width: '50vw', alignSelf: 'center'}}>PicShare</Typography>
        <img src="src/pic/bckCamera.jpg" width='500' style={{alignSelf: 'center'}}/>
    </>
  )
}
