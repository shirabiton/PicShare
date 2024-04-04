import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteSharing } from '../Redux/Actions/sharingActions';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import Rating from '@mui/material/Rating';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PlagiarismIcon from '@mui/icons-material/Plagiarism';


export default function NewCard(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mySharings = props.sharings;
    const type = props.type;

    const deletePost = async (sharingId) => {
        try {
            const response = await axios.delete(`http://localhost:8585/api/sharings/delete/${sharingId}`);
            dispatch(deleteSharing(sharingId));
        } catch (error) {
            console.log('Error delete sharing:', error);
        }
    };

    return (
        <>
            <div style={{
                display: 'grid',
                // שימוש בפיקסלים כדי שרוחב השורה לא יקטן כשהדף מתקטן, ואז הכרטיסים שאין להם מקום ירדו לשורות הבאות
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2vw',
                marginLeft: '1.5vw',
                maxWidth: '80vw',
                padding: '0 1vw',
                marginBottom: '20vh',
                direction:'rtl'
            }}
            >
                {mySharings.length > 0 ? mySharings.map((sharing) => (

                    <Card onClick={type == 0 ? () => navigate(`/SinglePost?sharingId=${sharing.id}`) : ''}
                        key={sharing.id}
                        sx={{
                            maxWidth: '300px', maxHeight: 'auto',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.25)',
                            borderRadius: '1vw',
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    alt="profile image"
                                    src={sharing.user.image || "src/pic/profile.png"}
                                    sx={{marginLeft:'0.5vw'}}
                                />
                            }
                            title={sharing.user.firstName}
                            subheader={sharing.user.email}
                        />
                        <CardMedia
                            component="img"
                            height="280"
                            image={`data:image/*;base64,${sharing.image}`}
                            alt="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="h5" sx={{ direction: 'rtl' }}>
                                {sharing.title}
                            </Typography>
                            <Rating name="read-only" value={sharing.score} readOnly sx={{ marginTop: '1.5vh' }} />
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left' }}>
                                {format(sharing.dateUpload, 'dd/MM/yyyy')}
                            </Typography>
                        </CardContent>

                        {type == 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <Tooltip title="מחק פוסט">
                                    <IconButton onClick={() => deletePost(sharing.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="ערוך פוסט">
                                    <IconButton>
                                        <ModeEditIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="צפה בפוסט">
                                    <IconButton onClick={() => navigate(`/SinglePost?sharingId=${sharing.id}`)}>
                                        <PlagiarismIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}
                    </Card>

                )) : <p style={{ textAlign: 'center' }}>לא נמצאו פוסטים</p>}</div>
        </>
    );
}      