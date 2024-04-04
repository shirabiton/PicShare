import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// importing from mui
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import GroupsIcon from '@mui/icons-material/Groups';
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AddButton from '../AddButton';

export default function SharingsIframe() {
    const drawerWidth = 240;
    const navigate = useNavigate();

    const sharingsPages = [{ id: 1, name: "צלמים.ות", icon: <GroupsIcon /> }, { id: 2, name: "לוקיישנים", icon: <PlaceIcon /> },
    { id: 3, name: "אביזרי צילום", icon: <  WorkIcon /> }, { id: 4, name: "טיפים", icon: <EmojiObjectsIcon /> }];

    return (
        <>
            <Box sx={{
                display: 'flex', flexDirection: 'column',
            }}>
                <CssBaseline />
                <Box component="main"
                    sx={{ flexGrow: 1, p: 3 }}>
                </Box>
                <Drawer
                    sx={{
                        zIndex: 0,
                        width: '17vw',
                        flexShrink: 0,

                        '& .MuiDrawer-paper': {
                            width: '17vw',
                            boxSizing: 'border-box',
                            paddingTop: '12vh',
                            borderLeft: '0.002vw solid black',
                            height: '98%'
                        },
                    }}
                    variant="permanent"
                    anchor="right">
                    <List>
                        {sharingsPages.map((page) => (
                            <ListItem key={page.id} disablePadding={true}
                                onClick={() => navigate(`/Category?id=${page.id}`)
                                }>
                                <ListItemButton>
                                    <ListItemText
                                        sx={{
                                            textAlign: 'center'
                                        }}
                                        primary={page.name} />
                                    {page.icon}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>

            <AddButton />

        </>
    );

}
