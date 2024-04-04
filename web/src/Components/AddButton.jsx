import React from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';

export default function AddButton() {

    const u = useSelector((state) => state.users.user); // Accessing data from the store
    console.log("u", u)

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    });

    const navigate = useNavigate();

    const go = () => {
        swal("אינך מחובר/רשום", {
            buttons: {
                registration: {
                    text: "הרשמה/התחברות",
                    value: "registration",
                },
                later: "יותר מאוחר",
            },
        }).then((value) => {
            if (value === "registration") {
                navigate('/SignUp'); // מעבר לדף ההרשמה/התחברות
            }
        });
    }
    return (
        <>
            <StyledFab color="secondary" aria-label="add" title='פוסט חדש'
                onClick={u.id != null ? () => navigate('/AddNewPost') : go}
                sx={{
                    backgroundColor: 'black', 
                    '&:hover': { backgroundColor: 'black', opacity: '0.8' },
                    '&:active': { backgroundColor: '#9400D3' }, marginTop: '90vh',
                    marginLeft: '5vw', position: 'fixed', zIndex: 100
                }}>
                <AddIcon />
            </StyledFab>

        </>
    )
}
