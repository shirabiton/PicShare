import React from "react";
import './Home.css';
import { Typography } from "@mui/material";

export default function HomePage() {
  return (
    <div className="container">
      <Typography variant='h3' style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 600 }}>PicShare</Typography>
      <img src="src/pic/camera-514992_1280.jpg" width='500vw' style={{ display: 'block', margin: '0 auto', marginBottom: '20px' }} />
    </div>
  );
}
