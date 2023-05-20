const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { imageModel } = require("./models/image_model");
const { cloudinary } = require("./utils/cloudinary");

mongoose.set("strictQuery", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello World");
});
app.post("/api/upload/image", async (req, res) => {
  try {
    const fileString = req.body.data;
    const result = await cloudinary.uploader
      .upload(fileString, { folder: "myfolder" })
      //   .then((res) => console.log(res))
      .catch((err) => console.log(err));
    const imageData = new imageModel({
      description: req.body.description,
      image: result.url,
    });
    const doc = await imageData.save();
    console.log(result.url);
    return res.json(doc);
  } catch (error) {
    return res.json(error);
  }
});
app.post("/api/upload/video", async (req, res) => {
  try {
    const videoString = req.body.video;

    // Upload video to Cloudinary
    const result = await cloudinary.uploader
      .upload(videoString, {
        resource_type: "video",
      })
      .catch((err) => console.log({ error: err }));

    res.json(result);
  } catch (error) {
    return res.json(error);
  }
});
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("APP is running on port 3001");
    });
  })
  .catch((err) => console.log(err));
