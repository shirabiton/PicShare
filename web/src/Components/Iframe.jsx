import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// importing from mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';


export default function Iframe() {

    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.users.user);

    const pages = [{ id: 1, name: 'התחבר / הירשם', path: '/SignIn' },
    { id: 2, name: 'דף הבית', path: '/HomePage' },
    { id: 3, name: 'קצת עלינו', path: '/About' },
    { id: 4, name: 'פוסטים', path: '' }];

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <>

            {/* header */}
            <Box sx={{
                display: 'flex', flexDirection: 'column',
                // minHeight: '100vh',
                zIndex: 1
            }}>
                <AppBar position="fixed" dir="rtl"
                    style={{ backgroundColor: '#9400D3', top: '0', width: '100%', overflow: 'hidden' }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            {/* logo */}
                            <Typography
                                // variant="h5"
                                noWrap component="a"
                                href="#app-bar-with-responsive-menu"
                                onClick={() => navigate('/HomePage')}
                                sx={{
                                    mr: 2, fontSize: '4vh',
                                    // The element will only be displayed when the page display size is medium or large
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace', fontWeight: 700,
                                    letterSpacing: '.3vw', color: 'white',
                                    textDecoration: 'none',
                                }} > picshare
                            </Typography>

                            {/* The header categories */}
                            <Box paddingRight="5vw" sx={{
                                flexGrow: 1,
                                // The element will only be displayed when the page display size is medium or large
                                display: { xs: 'none', md: 'flex' },
                            }}>
                                {pages.map((page) => (
                                    <Button key={page.id}
                                        onClick={() => {
                                            if (page.id === 4) {
                                                navigate(`/Category?id=${1}`);
                                            } else {
                                                navigate(page.path); // For other pages, navigate to their respective paths
                                            }
                                        }}
                                        sx={{
                                            paddingLeft: '6vw', my: 2,
                                            color: 'white', display: 'block',
                                            "&:hover": {
                                                borderBottom: "2px solid black",
                                                borderRadius: '0'
                                            },
                                            "&:active": { border: '0' }
                                        }} >
                                        {page.name}
                                    </Button>
                                ))}
                            </Box>

                            {/* adding small menu by click on the hamburger icon when the page gets smaller */}
                            <Box sx={{
                                flexGrow: 1,
                                // the element will only be displayed when the page's display size is small
                                display: { xs: 'flex', md: 'none' }
                            }}>

                                {/* adding hamburger menu icon */}
                                <IconButton size="large" aria-label="account of current user"
                                    aria-controls="menu-appbar" aria-haspopup="true"
                                    onClick={handleOpenNavMenu} color="inherit" >
                                    <MenuIcon />
                                </IconButton>

                                {/* adding small menu */}
                                <Menu id="menu-appbar" anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }} >

                                    {/* display the categories */}
                                    {pages.map((page) => (
                                        <MenuItem key={page.id} onClick={() => {
                                            if (page.id === 4) {
                                                navigate(`/Category?id=${1}`);
                                            } else {
                                                navigate(page.path); // For other pages, navigate to their respective paths
                                            }
                                        }}>
                                            <Typography textAlign="center">{page.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>

                            {/*adding logo in the center when the page gets smaller */}
                            <Typography
                                // variant="h5"
                                noWrap component="a"
                                href="#app-bar-with-responsive-menu"
                                onClick={() => navigate('/HomePage')}
                                sx={{
                                    mr: 2,
                                    //the element will only be displayed when the page's display size is small
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1, fontFamily: 'monospace',
                                    fontWeight: 700, letterSpacing: '.3vw',
                                    color: 'white', textDecoration: 'none',
                                    fontSize: '8vh',
                                }} > picshare
                            </Typography>

                            {/* search */}
                            <Paper
                                component="form"
                                sx={{
                                    display: 'flex', alignItems: 'center', width: '10vw',
                                    backgroundColor: 'inherit', border: '0.02vw solid white',
                                    marginLeft: '15vw',
                                }}
                            >
                                <InputBase
                                    sx={{
                                        ml: 1, flex: 1, direction: 'rtl', color: 'white',
                                    }}
                                    placeholder="חיפוש..."
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                    onChange={(e) => { navigate(`/BySearch?input=${e.target.value}`) }}
                                />
                                <SearchIcon sx={{ color: 'white' }} />
                            </Paper>


                            {/* the profile icon */}
                            <Typography sx={{ marginTop: '0.2vh', marginLeft: '0.6vw' }}>
                                {currentUser ? currentUser.firstName : ''}</Typography>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="פרופיל">
                                    <IconButton onClick={() => navigate('/Profile')} sx={{ p: 0 }}>
                                        <Avatar alt="propile image"
                                            src={currentUser.image || "src/pic/profile.png"} />
                                    </IconButton>
                                </Tooltip>
                            </Box>


                        </Toolbar>
                    </Container>
                </AppBar>
            </Box >
        </>
    )
}