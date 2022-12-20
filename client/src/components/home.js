import React,{useEffect, useState} from 'react'
import {
     Typography,
     Input,
     InputLabel,
     Button,
     TextField
 } from '@mui/material'
 import { uploadImage } from '../api/api';
const Home = () => {
  
  const [image,setImage] = useState('')

  const [previewSource,setPreviewSource] = useState()


  const HandleFormSubmit =(e)=>{
        e.preventDefault()  
      
        const data = new FormData(e.currentTarget);
        if(!image)return  
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
        const  imageData = {
            image:reader.result,
            description:data.get('description')
        }
        uploadImage(imageData)
        console.log(imageData);
      }
       
  }
  
  const previewImage = (file) => {
   
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPreviewSource(reader.result);
    };
};
  const handleChange = (e)=>{
    e.preventDefault()    
    const image =  e.target.files[0];
    previewImage(image)//fucntion
    setImage(image)
   
  }

  return (
    <div>
        <Typography variant='h3'>Cloudinary Example</Typography>
        <form onSubmit={HandleFormSubmit} >
            
           <InputLabel>Submit an image</InputLabel>
          
           <Input type='file' name='image'  onChange={handleChange}/>
           <br></br>
           <TextField 
           name='description'
          
           label="Description" 
           type="text"
           margin="normal"
           />
            <Button variant='contained' type='submit' sx={{margin:"20px"}}>Submit</Button>
        </form>


        {previewSource && (<img src={previewSource} style={{height:"300x"}}/>)}
    </div>
  )
}

export default Home