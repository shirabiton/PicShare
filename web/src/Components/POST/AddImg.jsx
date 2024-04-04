import React, { useEffect, useState } from "react";
// import Avatar from 'react-avatar-edit'

import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axios from "axios";


export default function AddImg(props) {
  // const [src, setSrc] = useState(null)
  // const [preview, setPreview] = useState(null)

  // const handleChange = (event) => {
  //   props.setMyImg(event.target.value)
  // };
  // const VisuallyHiddenInput = styled('input')({
  //     clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)',
  //     height: 1, overflow: 'hidden',
  //     position: 'absolute', bottom: 0,
  //     left: 0, whiteSpace: 'nowrap', width: 1,
  // });

  // const onCrop = view => {
  //     setPreview(view)
  //   }
  // const onClose=()=>{
  //   setPreview(null)
  //   }
  // const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('');
  

  // function handleImge(e) {
  //   console.log(e.target.files)
  //   // setImage(e.target.files[0])
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImageUrl(reader.result);
  //     // props.setImage(imageUrl)
  //   };
  //   // props.setMyImg(e.target.value)
  //   reader.readAsDataURL(e.target.files[0]);
    
  // }
  // useEffect=(()=>{
  //   props.setImage(imageUrl) 
  // },[imageUrl,props])
 
  // console.log("im",imageUrl)

  // function handleApi() {
  //   const formData = new FormData()
  //   formData.append('image', image)
  //   console.log(formData)
  //   // axios.post('',formData)
  //   //   .then((res)=>{
  //   //     console.log(res)
  //   //   })
  // }

  const handleImge = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setImageUrl(imageUrl);
      // props.setMyImg(imageUrl); // Update the imageUrl in the parent component
    };
    if (e.target.files[0]) {
      props.setMyImg(e.target.files[0])
      console.log("src",e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
    }}

  return (
    <>
      <div>
        <input type="file" name="file" onChange={handleImge}  ></input>
        {/* <button onClick={handleApi}>submit</button> */}
      </div>

      {imageUrl && (
        <div style={{ width: '100%', height: '50%', paddingBottom: '2%' }}>
          <h2>התמונה שהועלתה:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ paddingBottom: '0%', width: '100%', height: '92%' }}/>
        
        </div>
      )}
      {/* <button className='bImg' role='button' onClick={handleImgButtonClick}> <img src={preview} className='img' /></button> */}
      {/* <Button component="label" variant="contained"
                sx={{
                    backgroundColor: '#9400D3', width: '10vw', marginLeft: '60vw', 
                    marginTop: '0vh', marginBottom: '20vh', 
                    '&:hover':{opacity: '0.8',  backgroundColor: '#9400D3',}
                }}
                startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type="file" />
            </Button> */}

      {/* <div className={open ? 'avatar show' : 'avatar hide'}> */}
      {/* <span onClick={handleImgButtonClick}>&times;</span> */}
      {/* < div>
        <Avatar
          width={350}
          height={250}
          onCrop={onCrop}
          onClose={onClose}
          src={src}
          accept=".jpg,.jpeg,.png,.JPG" // הגבלה להעלאת קבצי תמונה בלבד
        />
        {/* {preview && <img src={preview}></img>} */}
      {/* </div> */}


    </>
  )
}