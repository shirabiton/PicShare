import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton } from "@mui/material";

export default function ScrollToTop() {

    const scroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <>
            <IconButton onClick={scroll}
                sx={{
                    width: '2vw',
                    height: '4vh',
                    borderRadius: '50%',
                    alignSelf: 'center',
                    marginBottom: '2vh'
                }}>
                <KeyboardArrowUpIcon sx={{color: "black"}}/>
            </IconButton>
        </>
    )
}
