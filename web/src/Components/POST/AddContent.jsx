import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AddContent(props) {

  const handleChangeTitle = (event) => {
    props.setMyContent((prevContent) => ({
      ...prevContent,
      title: event.target.value
    }));
  };

  const handleChangeContent = (event) => {
    // STATE  שמור בריאקט באופן אוטמטי לכל prevContent- 
    props.setMyContent((prevContent) => ({
      ...prevContent,
      content: event.target.value
    }));
}
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' ,direction:'rtl',marginRight:'15%'},
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{direction:'rtl'}}>
        <TextField sx={{marginLeft:'15%'}}
          id="standard-multiline-flexible"
          label="כותרת"
          multiline
          maxRows={1}
          variant="standard"
          onChange={(e)=>handleChangeTitle(e)}
          value={props.setMyContent.title} 
        />
        {/* <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="standard"
        /> */}
        <TextField
          id="standard-multiline-static"
          label="תוכן הפוסט"
          multiline
          rows={4}
          defaultValue=""
          variant="standard"
          onChange={(e)=>handleChangeContent(e)}
          value={props.setMyContent.content} 
        />
      </div>
    </Box>
  );
}