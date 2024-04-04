import React from 'react';
import axios from 'axios';
import { deleteUser } from '../../Redux/Actions/userActions';
import { Stack, Button } from "@mui/material";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logOutUser } from '../../Redux/Actions/userActions';
import NewCard from '../NewCard';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import swal from 'sweetalert';


export default function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showNewCard, setShowNewCard] = useState(false);

  const handleShowNewCard = () => {
    setShowNewCard(prevState => !prevState); // Toggle the state value
  };

  const currentUser = useSelector((state) => state.users.user);
  const userFullName = `${currentUser.firstName} ${currentUser.lastName}`;

  const sharings = useSelector((state) => state.sharings.sharingsList);
  console.log("sharings", sharings)

  const [sharingsByUser, setSharingsByUser] = useState([]);


  useEffect(() => {
    if (sharings && currentUser) {
      const filtered = sharings.filter(sharing => sharing.user.id == currentUser.id);
      setSharingsByUser(filtered);
    }
  }, [sharings]);


  const deleteProfile = async (userId) => {
    try {
      await axios.delete(`http://localhost:8585/api/user/deleteUser/${userId}`);
      dispatch(deleteUser());
    } catch (error) {
      console.log('Error delete user:', error);
    }
  };

  const isSureToDelete = () => {
    swal({
      title: "החשבון שלך ימחק",
      buttons: {
        login: {
          text: "מחק",
          value: "login",
        },
        cancel: "ביטול",
      },
    })
      .then((value) => {
        switch (value) {
          case "login":
            deleteProfile(currentUser.id);
            () => dispatch(logOutUser());
          navigate('/HomePage');  
        }
      });
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
      {/* פרטי פרופיל */}
      <List sx={{
        width: '100%', maxWidth: 240, bgcolor: 'background.paper',
        direction: 'rtl', alignSelf: 'center', marginTop: '7vh',
        marginBottom: '13vh'
      }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              style: { textAlign: 'right' },
            }}
            secondaryTypographyProps={{
              style: { textAlign: 'right' },
            }}
            primary="שם" secondary={currentUser.firstName != null
              && currentUser.lastName != null ? userFullName : '-'} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              style: { textAlign: 'right' },
            }}
            secondaryTypographyProps={{
              style: { textAlign: 'right' },
            }}
            primary="אימייל" secondary={currentUser.email != null ? currentUser.email : '-'} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <KeyIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primaryTypographyProps={{
              style: { textAlign: 'right' },
            }}
            secondaryTypographyProps={{
              style: { textAlign: 'right' },
            }}
            primary="סיסמה" secondary={currentUser.password != null ? currentUser.password : '-'} />
        </ListItem>
      </List>

      <Stack spacing={2} direction="column"
        sx={{ alignSelf: 'center', marginBottom: '2vh' }}>


        {/* יציאה מן החשבון */}
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
          onClick={currentUser.id != null ? () => dispatch(logOutUser())
            : notConnected}>התנתקות</Button>


        {/* מחיקת החשבון */}
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
          onClick={currentUser.id != null ? isSureToDelete : notConnected}>מחק חשבון</Button>
      </Stack >

      <Stack spacing={2} direction="column"
        sx={{ alignSelf: 'center', marginBottom: '7vh' }}>


        {/* כפתור להצגת הפוסטים השעלה המשתמש */}
        <Button variant="outlined"
          sx={{
            color: '#9400D3', borderColor: '#9400D3',
            alignSelf: 'center', marginBottom: '3vh',
            '&:active': {
              color: 'white', backgroundColor: '#9400D3',
              borderColor: 'white', opacity: '0.5'
            },
            '&:hover': {
              color: 'white', backgroundColor: '#9400D3',
              borderColor: 'white',
            },
          }}
          onClick={currentUser.id != null ? handleShowNewCard : notConnected}>הפוסטים שלי</Button>

        {showNewCard && <NewCard sharings={sharingsByUser} type={1} />}
      </Stack>

    </>
  );
}
