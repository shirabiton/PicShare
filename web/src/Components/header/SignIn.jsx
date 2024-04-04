import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Components.css';
import { checkUserByEmail } from '../../Redux/Actions/userActions';
import { useDispatch } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';


export default function SignIn() {

  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const arrived = () => {
    swal({
      title: "אתה מחובר",
      text: "!ברוך הבא",
      icon: "success",
      buttons: {
        confirm: {
          text: "אוקי",
          value: true,
          visible: true,
          className: "custom-btn-class",
          closeModal: true,
        },
      }
    })
      .then((value) => {
        if (value) {
          navigate('/HomePage');
        }
      });
  }

  const wrongPassword = () => {
    swal({
      title: "אופס... הסיסמה שגויה",
      buttons: {
        singUp: {
          text: "הירשם",
          value: "signUp",
        },
        cancel:
          "נסה שוב",
      },
    })
      .then((value) => {
        switch (value) {
          case "signUp":
            navigate('/SignUp')
        }
      });
  }

  const notExist = () => {
    swal({
      title: "אופס... משתמש לא קיים",
      buttons: {
        singUp: {
          text: "הירשם",
          value: "signUp",
        },
        cancel: "נסה חשבן אחר",
      },
    })
      .then((value) => {
        switch (value) {
          case "signUp":
            navigate('/SignUp')
        }
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8585/api/user/signIn', {
        email: email,
        password: password,
      });
      // כאן אתה יכול לטפל בתשובה מהשרת
      if (response.status === 200) {
        dispatch(checkUserByEmail(response.data))
        arrived()
        // אם התחברות מוצלחת, מעביר את המשתמש לעמוד About
      } else if (response.status === 201) {
        wrongPassword()
        // התחברות מוצלחת אך סיסמה שגויה
        // טיפול במצב זה
      } else {
        notExist()
        // טיפול במצבים אחרים
      }
    } catch (error) {
      // טיפול בשגיאות
      console.log('Error signing in:', error);
    }
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" sx={{ direction: 'rtl' }}>
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '20vh',
              marginBottom: '20vh',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#9400D3' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              התחבר
            </Typography>


            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label='כתובת דוא"ל'
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#9400D3',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      color: '#9400D3',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#9400D3',
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    '&.Mui-focused': {
                      color: '#9400D3',
                    },
                  },
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3, mb: 2, backgroundColor: 'black',
                  '&:hover': { backgroundColor: 'black', opacity: '0.9' },
                  '&:active': { backgroundColor: '#9400D3' }
                }}
              >
                התחבר
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={() => navigate('/ForgotPassword')}
                    variant="body2"
                    sx={{
                      color: '#9400D3', textDecoration: 'none',
                      ' &:active': { textDecoration: 'underline' },
                      ' &:hover': { textDecoration: 'underline' }
                    }}
                  >
                    שכחתי סיסמה
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => navigate('/SignUp')}
                    sx={{
                      color: '#9400D3', textDecoration: 'none',
                      ' &:active': { textDecoration: 'underline' },
                      ' &:hover': { textDecoration: 'underline' }
                    }}>
                    עדיין אין לך חשבון? הירשם
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider >
    </>
  );
}

