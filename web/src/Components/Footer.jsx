import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import SearchIcon from '@mui/icons-material/Search';


export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const pages = [{ id: 1, name: 'התחבר / הירשם', path: '/SignIn' },
    { id: 2, name: 'דף הבית', path: '/HomePage' },
    { id: 3, name: 'קצת עלינו', path: '/About' },
    { id: 4, name: 'פוסטים', path: '' }];


    return (
        <>
            <Drawer variant="permanent" anchor="bottom"
                sx={{
                    // display: { xs: 'none', md: 'flex' },
                    display: 'flex',
                    bottom: 0,
                    zIndex: '1',
                    // width: '100%',??
                    // padding: '2% 5%',
                    // overflow: 'hidden',

                    '& .MuiDrawer-paper': {
                        backgroundColor: '#9400D3',
                        flexDirection: 'row',
                        position: 'relative',
                        // boxSizing: 'border-box',
                        width: '100%',
                        // height: '27vh',
                        justifyContent: 'space-between',
                        // display: 'flex',   
                        // overflow: 'hidden', 
                        // marginBottom: '0.2%', 
                    },
                }}
            >
                <List sx={{
                    display: 'fixed',
                    // width: '70vw',
                    padding: '6vh 3vw 3vh 6vw',
                    // paddingTop: '6vh',
                    // paddingBottom: '4vh',
                    // paddingLeft: '8vw',
                    // paddingRight: '8vw',
                    // flexDirection: 'row',
                }}>

                    {/* logo */}
                    <Typography
                        //  variant="h5" 
                        noWrap component="a"
                        href="#app-bar-with-responsive-menu"
                        onClick={() => navigate('/HomePage')}
                        sx={{
                            mr: 2, fontFamily: 'monospace', fontWeight: 700,
                            letterSpacing: '.3vw', color: 'white',
                            textDecoration: 'none', fontSize: '3vh',
                        }} > picshare </Typography>

                    {/* about */}
                    <div style={{ paddingLeft: '17vw' }}>
                        <ListItemText
                            primary={
                                <Typography variant='h5'
                                    sx={{
                                        overflowWrap: 'break-word', whiteSpace: 'pre-line',
                                        direction: 'rtl', color: 'white',
                                        textAlign: 'center', paddingLeft: '6vw',
                                        fontSize: '1.8vh', fontWeight: 600,
                                        width: '25vw',
                                    }}>
                                    כאן תוכלו לחלוק ולקבל המלצות מרתקות על צלמים מנוסים, להחכים על ידי אינספור עצות וטיפים על צילום,
                                    ולהתרשם מעבודות מרהיבות של מגוון צלמים. שתפו את ההתרשמות שלכם, המלצות וניסיון אישי עם הקהילה, והתחילו לגלות עולם מרתק של אמנות וצילום!
                                </Typography>
                            }
                        > </ListItemText>
                    </div>

                    {/* categories */}
                    <Box sx={{
                        //  flexDirection: 'column',
                        paddingLeft: '15vw',
                    }}>
                        {pages.map((page) => (
                            <ul key={page.id}>
                                <Typography
                                    onClick={() => {
                                        if (page.id === 4) {
                                            navigate(`/Category?id=${1}`);
                                        } else {
                                            navigate(page.path); // For other pages, navigate to their respective paths
                                        }
                                    }}
                                    sx={{
                                        paddingBottom: '1vh',
                                        fontWeight: 530,
                                        color: 'white',
                                        textAlign: 'center',
                                        fontSize: '2vh',
                                    }} >{page.name}</Typography>
                            </ul>
                        ))}
                    </Box>

                    {/* icons */}
                    <div style={{
                        marginTop: '15vh', marginLeft: '-44vw', paddingTop: '4vh',
                        paddingBottom: '2vh', boxSizing: 'initial',
                        display: 'flex', justifyContent: 'center',
                    }}>
                        <a href="https://www.facebook.com/picshare/" target="_blank">
                            <FacebookIcon sx={{ color: 'white', width: '2vw', display: 'flex', paddingRight: '2vw' }} />
                        </a>

                        <a href="https://twitter.com/picshare/" target="_blank">
                            <TwitterIcon sx={{ color: 'white', width: '2vw', display: 'flex', paddingRight: '2vw' }} />
                        </a>

                        <a href="https://www.instagram.com/picshare/" target="_blank">
                            <InstagramIcon sx={{ color: 'white', width: '2vw', display: 'flex', paddingRight: '2vw' }} />
                        </a>

                        <a href="https://www.google.com/search?q=picshare" target="_blank">
                            <SearchIcon sx={{ color: 'white', width: '2vw', display: 'flex', paddingRight: '2vw' }} />
                        </a>
                    </div>

                </List>
            </Drawer >


            {/* made by.. */}
            < Drawer
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box', display: 'flex', position: 'static',
                        flexDirection: 'row', justifyContent: 'space-between',
                    },
                }
                }
                variant="permanent" anchor="bottom" >
                <ListItem disablePadding sx={{
                    fontWeight: '550', fontSize: '1.8vh',
                    textAlign: 'center', display: 'block',
                }}>
                    made with ❤ by sheindy & shira | © 2024</ListItem>
            </Drawer >
        </>
    )
}


