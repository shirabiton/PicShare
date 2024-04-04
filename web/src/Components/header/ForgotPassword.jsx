import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Stack, Button } from "@mui/material";


export default function ForgotPassword() {

    const rightCode=()=>{
        swal("!הקוד אומת בהצלחה");
    }
    
    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    marginTop: '20vh', marginBottom: '40vh',
                    alignSelf: 'center'
                }}
                noValidate autoComplete="off">
                    <Typography sx={{ paddingBottom: '2vh', minWidth: '9cm', direction: 'rtl' }}>כעת נשלח קוד אימות חשבון לכתובת המייל שלך. הקוד תקף למשך 5 דקות</Typography>
                    <Typography sx={{ paddingBottom: '5vh', minWidth: '9cm', direction: 'rtl' }}>הקש את הקוד שהתקבל:</Typography>


                <TextField sx={{
                    paddingBottom: '5vh',
                    '& label': {
                        color: 'black',
                        '&.Mui-focused': {
                            color: '#9400D3',
                        },
                    }, '& .MuiInput-underline:before': {
                        borderBottomColor: 'black',
                    },
                    '& .MuiInput-underline.Mui-focused:after': {
                        borderBottomColor: '#9400D3',
                    },
                }}
                    id="standard-basic" label="קוד אימות" variant="standard" />

                <Stack spacing={2} direction="row">

                    <Button variant="outlined"
                        sx={{
                            color: '#9400D3', borderColor: '#9400D3',
                            '&:active': {
                                color: 'white', backgroundColor: '#9400D3',
                                borderColor: 'white', opacity: '0.5'
                            },
                            '&:hover': {
                                color: 'white', backgroundColor: '#9400D3',
                                borderColor: 'white', 
                            },
                        }}
                        onClick={rightCode}
                    >שלח</Button>

                </Stack>
            </Box>
        </>)
}
