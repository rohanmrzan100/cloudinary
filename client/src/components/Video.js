import React, { useState } from "react";
import axios from "axios";

const VideoUpload = () => {
  const [video, setVideo] = useState();
  const [uploadVideo, setUploadVideo] = useState();

  const handleFileChange = (e) => {
    console.log("HERE");
    setVideo(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("video", video);
    // console.log(formData)

    const reader = new FileReader();
    reader.readAsDataURL(video);
    reader.onloadend = () => {
      const uploadVideo = reader.result;
      setUploadVideo(uploadVideo);
    };

    try {
      // console.log(uploadVideo);
      // Send video file to the server
      const response = await axios.post(
        "/api/upload/video",
        {
          video: uploadVideo,
          name: "rohan",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      //   Do something with the response, e.g., save the video URL to the database
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default VideoUpload;
