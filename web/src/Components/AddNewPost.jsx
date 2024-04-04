import * as React from 'react';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import SelectionCategory from '../Components/POST/SelectionCategory'
import AddImg from '../Components/POST/AddImg'
import AddContent from '../Components/POST/AddContent'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addSharing } from '../Redux/Actions/sharingActions';
import { useNavigate } from 'react-router-dom';


export default function AddNewPost() {

  const [activeStep, setActiveStep] = useState(0);
  const [myCategory, setMyCategory] = useState("")
  const [myContent, setMyContent] = useState({ title: '', content: '' })
  const [myImg, setMyImg] = useState('')
  const nav = useNavigate()
  const u = useSelector((state) => state.users.user); // Accessing data from the store

  const dispatch = useDispatch();

  const steps = [
    {
      label: 'בחירת קטגוריה',
      description: <SelectionCategory setMyCategory={setMyCategory} myCategory={myCategory} />
    },
    {
      label: 'תוכן הפוסט',
      description: <AddContent setMyContent={setMyContent} myContent={myContent} />
    },
    {
      label: 'העלאת תמונה',
      description: <AddImg setMyImg={setMyImg} myImg={myImg} />
    },
  ];

  const addPost = () => {
    if (myCategory != '' && myImg != '') {

      // get the selected file from the input
      const file = myImg;
      // create a new FormData object
      const formData = new FormData();

      // append the file to the FormData object
      formData.append("image", file);

      // append additional fields (object) to the FormData object
      const objectToSend = {
        "id": 0,
        "title": myContent.title,
        "description": myContent.content,
        "score": 0,
        "user": {
          "id": u.id,
        },
        "category": {
          "id": myCategory,
        },

      };

      // Convert the object to a JSON string and append it to FormData
      formData.append("sharing", new Blob([JSON.stringify(objectToSend)], { type: "application/json" }))

      // make a POST request to the File Upload API with the FormData object and Rapid API headers
      axios
        .post("http://localhost:8585/api/sharings/uploadSharing", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-rapidapi-host": "file-upload8.p.rapidapi.com",
            "x-rapidapi-key": "your-rapidapi-key-here",
          },
        })
        .then((response) => {
          dispatch(addSharing(response.data));
          // handle the response
          console.log(response);
          added()
        })
        .catch((error) => {
          // handle errors
          console.log('Error add sharing:', error);
        });
    }
    else {
      Swal.fire({
        title: "חובה לבחור קטגוריה ולעלות תמונה",
        showClass: {
          popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
        },
        hideClass: {
          popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
        }
      });
    }
  };

  const added = () => {
    swal({
      title: "נוסף בהצלחה!",
      icon: "success",
      buttons: {
        confirm: {
          text: "אוקי",
          value: true,
          visible: true,
          className: "custom-btn-class",
          closeModal: true,
        },
      },
    })
      .then((value) => {
        if (value) {
          nav(`/Category?id=${myCategory}`) // Navigate after user acknowledges the success message
        }
      });
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, marginTop: '8%', direction: ' rtl', marginBottom: '5%', marginLeft: '40vw' }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel sx={{ marginRight: '0', }}
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent sx={{ borderLeft: 'none', borderRight: '1px solid plum', marginRight: '5%' }}>
                <Typography >{step.description}</Typography>
                {console.log('myCategory', myCategory)}
                {console.log('myContent', myContent)}
                {console.log('myImg', myImg)}

                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    onClick={index === steps.length - 1 ? addPost : handleNext}
                    sx={{
                      mt: 1, mr: 1, backgroundColor: '#9400D3', color: 'white',
                       '&:hover': {
                        backgroundColor: '#9400D3',
                      },
                    }}
                  >
                    {index === steps.length - 1 ? 'הוסף' : 'המשך'}
                  </Button>

                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{
                      mt: 1, mr: 1, backgroundColor: '#9400D3', color: 'white',
                       '&:hover': {
                        backgroundColor: '#9400D3',
                      },
                    }}
                  >
                    Back
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3, color: 'yellow' }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1, backgroundColor: '#9400D3' }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>

    </>
  );
}