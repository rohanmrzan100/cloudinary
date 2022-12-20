const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const cors = require('cors')
const {imageModel} = require('./models/image_model')
const {cloudinary} = require('./utils/cloudinary')

mongoose.set('strictQuery', true);
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("hello World")
})
app.post("/api/upload",async (req,res)=>{
    try {
        const fileString = req.body.data
        const result = await cloudinary.uploader.upload(fileString,{
            upload_preset:"my_images"

        });
        const imageData = new imageModel({
            description:req.body.description,
            image:result.url
        })
        const doc = await imageData.save()
        console.log(result.url);
        return res.json(doc)
        
    } catch (error) {
        return res.json(error)
    }
})
mongoose.connect(`mongodb+srv://rohanmrzan100:${process.env.MONGODB_PW}@cluster0.8eze3i1.mongodb.net/cloudinaryExample`,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
        .then(()=>{
            app.listen(3001,()=>{
                console.log("APP is running on port 3001");
            })
        })
        .catch((err)=>console.log(err))