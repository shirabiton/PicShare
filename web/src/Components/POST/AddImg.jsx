import React, { useState } from "react";

export default function AddImg(props) {
  const [imageUrl, setImageUrl] = useState('');
  
  const handleImge = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setImageUrl(imageUrl);
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
      </div>

      {imageUrl && (
        <div style={{ width: '100%', height: '50%', paddingBottom: '2%' }}>
          <h2>התמונה שהועלתה:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ paddingBottom: '0%', width: '100%', height: '92%' }}/>
        </div>
      )}
    </>
  )
}