import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getSharingById } from '../Redux/Actions/sharingActions';
import { addComment, getComments } from '../Redux/Actions/commentAction';

import { format } from 'date-fns';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, CircularProgress, Stack, Button, CardMedia } from '@mui/material';
import swal from 'sweetalert';


export default function SinglePost() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const searchSharingId = new URLSearchParams(location.search);
    const sharingId = searchSharingId.get('sharingId'); //URL שליפת הפוסט ע"י ה  

    const [score, setScore] = useState(1); // דירוג פוסט
    const [content, setContent] = useState('');

    const [isRatingVisible, setIsRatingVisible] = useState(false);
    const [isMouseOverRating, setIsMouseOverRating] = useState(false);

    const currentUser = useSelector((state) => state.users.user);

    const handleMouseLeaveRating = () => {
        setIsMouseOverRating(false);
        if (!document.activeElement || document.activeElement.tagName !== 'INPUT') {
            setIsRatingVisible(false);
        }
    };

    // בדיקת תקינות רייטינג
    const handleChange = (event, newScore) => {
        if (newScore === null || newScore < 1) {
            setScore(1);
        } else {
            setScore(newScore);
        };
    }

    // ID הפוסט הנוכחי ע"י 
    useEffect(() => {
        const fetchSingleSharing = async () => {
            try {
                const response = await axios.get(`http://localhost:8585/api/sharings/get/${sharingId}`);
                dispatch(getSharingById(response.data));
            } catch (error) {
                console.log('Error fetching sharing:', error);
            }
        };
        fetchSingleSharing();
    }, [dispatch, sharingId]);

    const selectedSharing = useSelector((state) => state.sharings.sharing);

    // USER בעל הפוסט כ    
    const owner = selectedSharing ? selectedSharing.user : {};
    const ownerFullName = owner ? `${owner.firstName} ${owner.lastName}` : '';

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:8585/api/comments/get');
                dispatch(getComments(response.data));
            } catch (error) {
                console.log('Error fetching comments:', error);
            }
        };
        if (sharingId) {
            fetchComments();
        }
    }, [dispatch, sharingId]);


    // רשימת כל התגובות של האתר
    const commentsList = useSelector((state) => state.comments.commentsList);

    // רשימת כל התגובות של הפוסט הנוכחי
    const commentsBySharing = commentsList.filter(comment => comment.sharing.id == sharingId);
    const reversedComments = commentsBySharing ? [...commentsBySharing].reverse() : [];

    const isConnected = () => {
        return currentUser.id != null ? addNewComment() : notConnected();
    }

    const addNewComment = async (event) => {
        const newComment = {
            "date": '',
            "content": content,
            "score": score,
            "sharing": selectedSharing,
            "user": currentUser,
        }
        try {
            const response = await axios.post('http://localhost:8585/api/comments/createNew', newComment);
            dispatch(addComment(response.data));
            setContent('');
        } catch (error) {
            console.log('Error adding comment: ', error);
        }
    }

    const notConnected = () => {
        swal({
            title: "אופס... אתה לא מחובר",
            buttons: {
                login: {
                    text: "התחבר",
                    value: "login",
                },
                cancel: "בטל",
            },
        })
            .then((value) => {
                switch (value) {
                    case "login":
                        navigate('/SignIn')
                }
            });
    }

    return (
        <>
            {/* הפרופיל של מעלה הפוסט */}
            <Grid container justifyContent="flex-end">
                <Grid item xs={12} md={6}>
                    {owner != null ? (
                        <List sx={{
                            width: '100%', maxWidth: 220, bgcolor: 'background.paper',
                            marginTop: '5vh', direction: 'rtl',
                            marginLeft: '30vw',
                        }}>
                            <div>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                    </ListItemAvatar>
                                    <ListItemText

                                        sx={{
                                            textAlign: 'right',
                                            direction: 'rtl',
                                        }}
                                        primaryTypographyProps={{
                                            style: { textAlign: 'right' },
                                        }}
                                        secondaryTypographyProps={{
                                            style: { textAlign: 'right' },
                                        }}
                                        primary={<span style={{ direction: 'rtl' }}>{ownerFullName}</span>
                                        }
                                        secondary={
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span>{owner.email}</span>
                                            </div>
                                        }
                                    />
                                </ListItem>
                            </div>
                        </List>
                    ) : (
                        <Box sx={{ display: 'flex', marginTop: '10vh', marginBottom: '40vh', alignSelf: 'center' }}>
                            <CircularProgress sx={{ color: 'black' }} />
                        </Box>
                    )}
                </Grid>
            </Grid>

            {/* תמונה */}
            <CardMedia
                sx={{ alignSelf: 'center', border: '0.02vw solid black', width: 500}}
                component="img"
                image={`data:image/*;base64,${selectedSharing.image}`}
                alt="Pic"
            />

            {/* דירוג ותאריך העלה */}
            <div style={{ marginTop: '5vh', display: 'flex', justifyContent: 'space-between', alignSelf: 'center', width: 500 }}>
                <React.Fragment>
                    {selectedSharing.dateUpload ? format(selectedSharing.dateUpload, 'dd/MM/yyyy') : ''}
                </React.Fragment>
                <Rating size="large" name="read-only" value={selectedSharing.score ? parseInt(selectedSharing.score) : 0} readOnly />
            </div>

            {/* תוכן הפוסט */}
            {selectedSharing ?
                <List sx={{
                    width: '100%', maxWidth: 500, bgcolor: 'background.paper',
                    direction: 'rtl', alignSelf: 'center', paddingBottom: '15vh',
                    paddingTop: '10vh',
                }}>
                    <Divider variant="inset" component="li" sx={{ width: '100%' }} />
                    <ListItem alignItems="flex-start">
                        <ListItemText sx={{ direction: 'rtl', textAlign: 'center' }}
                            primary={selectedSharing.title}
                            secondary={
                                <React.Fragment>
                                    {selectedSharing.description}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" sx={{ width: '100%' }} />
                </List>
                : <Box sx={{ display: 'flex', marginTop: '10vh', marginBottom: '40vh', alignSelf: 'center' }}>
                    <CircularProgress sx={{ color: 'black' }} />
                </Box>}

            <div style={{ marginTop: '4vh', display: 'flex', justifyContent: 'space-between', alignSelf: 'center', width: 85 }}>
                <h2 style={{ marginRight: 'auto' }}>
                    תגובות
                </h2>
                <h2>{commentsBySharing ? commentsBySharing.length : 0}</h2>
            </div>


            {/* הוספת תגובה */}
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: 500 },
                    alignSelf: 'center',
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    value={content}
                    sx={{
                        paddingBottom: '5vh',
                        '& label': {
                            color: 'black',
                            '&.Mui-focused': {
                                color: '#9400D3',
                            },
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'black',
                        },
                        '& .MuiInput-underline.Mui-focused:after': {
                            borderBottomColor: '#9400D3',
                        },
                    }}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    id="standard-basic"
                    label="הוספת תגובה"
                    variant="standard"
                    onFocus={() => setIsRatingVisible(true)}
                    onBlur={() => {
                        if (!isMouseOverRating) {
                            setIsRatingVisible(false);
                        }
                    }}
                />
                {isRatingVisible && (
                    <Stack
                        spacing={2}
                        direction="row"
                        onMouseEnter={() => setIsMouseOverRating(true)}
                        onMouseLeave={handleMouseLeaveRating}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                color: '#9400D3',
                                borderColor: '#9400D3',
                                '&:active': {
                                    color: 'white',
                                    backgroundColor: '#9400D3',
                                    borderColor: 'white',
                                    opacity: '0.5',
                                },
                                '&:hover': {
                                    color: 'white',
                                    backgroundColor: '#9400D3',
                                    borderColor: 'white',
                                },
                            }}
                            onClick={isConnected}
                        >
                            הוסף
                        </Button>
                        <Rating
                            name="simple-controlled"
                            value={score}
                            onChange={handleChange}
                        />
                    </Stack>
                )}
            </Box >


            {/* תגובות */}
            <List sx={{
                width: '100%',
                maxWidth: 500,
                bgcolor: 'background.paper',
                direction: 'rtl',
                alignSelf: 'center',
                paddingBottom: '15vh',
            }}>
                {reversedComments && reversedComments.map((comment) =>
                    <div key={comment.id}>
                        <ListItem alignItems="flex-start" sx={{ paddingTop: '1vh', paddingBottom: '1vh' }}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                                <ListItemText
                                    sx={{
                                        textAlign: 'right',
                                        direction: 'rtl',
                                        paddingTop: '1vh',
                                    }}
                                    primaryTypographyProps={{
                                        style: { textAlign: 'right' },
                                    }}
                                    primary={`${comment.user.firstName} ${comment.user.lastName}`}
                                />
                                <Rating name="read-only" size='small' value={parseInt(comment.score)} readOnly sx={{ direction: 'ltr' }} />
                                <ListItemText
                                    sx={{
                                        textAlign: 'right',
                                        direction: 'rtl',
                                        paddingTop: '0.5rem',
                                    }}
                                    primaryTypographyProps={{
                                        style: { textAlign: 'right' },
                                    }}
                                    secondaryTypographyProps={{
                                        style: { textAlign: 'right' },
                                    }}
                                    primary={comment.name}
                                    secondary={comment.content}
                                />
                                <ListItemText
                                    sx={{
                                        textAlign: 'right',
                                        direction: 'rtl',
                                        paddingTop: '1vh',
                                    }}
                                    secondaryTypographyProps={{
                                        style: { textAlign: 'right' },
                                    }}
                                    secondary={comment.date ? format(comment.date, 'dd/MM/yyyy') : ''}
                                />
                            </Box>
                        </ListItem>
                        <Divider variant="inset" component="li" sx={{ width: '90%' }} />
                    </div>
                )}
            </List>



        </>
    )
}
