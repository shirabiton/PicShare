import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function SelectionCategory(props) {

  const [selectedValue, setSelectedValue] = useState(''); // הגדרת סטייט לשמירת הערך הנבחר
 
  const handleChange = (event) => {
    props.setMyCategory(event.target.value)
  };


  return (
    <FormControl >
      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        // defaultValue="female"
        value={props.myCategory} // שימוש בערך מהסטייט כערך נבחר ברדיו
        onChange={(e)=> handleChange(e)} // טיפול בשינויים בערך הנבחר
        name="radio-buttons-group"

      >
        <FormControlLabel value="3" control={<Radio />} label="אביזרי צילום " />
        <FormControlLabel value="4" control={<Radio />} label="טיפים" />
        <FormControlLabel value="2" control={<Radio />} label="לוקיישנים" />
        <FormControlLabel value="1" control={<Radio />} label="צלמים" />
      </RadioGroup>
    </FormControl>
  );
}