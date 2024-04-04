import React from 'react';
import { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { addUser } from '../../Redux/Actions/userActions';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function SignUp() {
    const defaultTheme = createTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);


    function validateFirstAndLastName(firstName, lastName) {
        const re = /^[^\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;;
        console.log(re.test(firstName))
        console.log(re.test(lastName))
        if (re.test(firstName) && re.test(lastName))
            return re.test(firstName) && re.test(lastName);
        else
            setError(true)
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(re.test(email))
        if (!re.test(email))
            setError(true)
        else
            return re.test(email);
    }

    function validatePassword(password) {
        if (password.length < 4) {
            setError(true)
        }
        else {
            return password.length >= 4;
        }

    }


    const addNewUser = async (event) => {
        event.preventDefault();
        if (validateFirstAndLastName(firstName, lastName) && validateEmail(email) && validatePassword(password)) {
            const newUser = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "image": "D://Users//User//Desktop//web//src//pic"
            }
            try {
                const response = await axios.post('http://localhost:8585/api/user/createUser', newUser);
                dispatch(addUser(response.data));
                added();
            } catch (error) {
                console.log('Error adding user:', error);
                setErrorEmail(true);
            }
        }
    }

    const added = () => {
        swal({
            title: "נוספת בהצלחה",
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
            },
        })
            .then((value) => {
                if (value) {
                    navigate('/HomePage');
                }
            });
    }


    return (

        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ direction: 'rtl' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
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
                        הירשם
                    </Typography>
                    <Box component="form" noValidate
                        onSubmit={addNewUser}
                        sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="שם פרטי"
                                    autoFocus
                                    onChange={(e) => setFirstName(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#9400D3',
                                            },
                                        },
                                    }}
                                    InputLabelProps={{ // changes the lable's color
                                        sx: {
                                            '&.Mui-focused': {
                                                color: '#9400D3',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="שם משפחה"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) => setLastName(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#9400D3',
                                            },
                                        },
                                    }}
                                    InputLabelProps={{ // changes the lable's color
                                        sx: {
                                            '&.Mui-focused': {
                                                color: '#9400D3',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label='כתובת דוא"ל'
                                    name="email"
                                    autoComplete="email"
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
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="סיסמה"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#9400D3',
                                            },
                                        },
                                    }}
                                    InputLabelProps={{ // changes the lable's color
                                        sx: {
                                            '&.Mui-focused': {
                                                color: '#9400D3',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Stack sx={{ width: '95%', marginTop: '2%' }} spacing={2}>
                                {error && (
                                    <Alert severity="error" sx={{ paddingRight: '2%' }}>
                                        אחד מהנתונים שגוי
                                    </Alert>
                                )}

                                {errorEmail && (
                                    <Alert severity="error" sx={{ paddingRight: '2%' }}>
                                        כתובת דוא"ל קיימת
                                    </Alert>
                                )}

                            </Stack>
                        </Grid>

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
                            הירשם
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link
                                    variant="body2"
                                    onClick={() => navigate('/SignIn')} sx={{
                                        color: '#9400D3', textDecoration: 'none',
                                        ' &:active': { textDecoration: 'underline' },
                                        ' &:hover': { textDecoration: 'underline' }
                                    }}>
                                    כבר יש לך חשבון? התחבר
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}