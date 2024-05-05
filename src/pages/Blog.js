import React, { useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MuiFileInput } from "mui-file-input";
import imageCompression from "browser-image-compression";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { createBlog } from "../state/blog/blogSlice";
import Layout from "../components/layout";
const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userReducer = useSelector((state) => state.userData);
  const { token, loginUser } = userReducer;
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const handleImage = async (e) => {
    setBlogImage(e);
    const imageFile = e;
    if (!imageFile) return;
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(imageFile, options);
      setBlogImage(compressedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("blog", blog);
    formDataToSend.append("ownerId", loginUser?._id);
    formDataToSend.append("ownerName", loginUser?.userName);
    formDataToSend.append("blogImage", blogImage);

    await dispatch(createBlog({ token, data: formDataToSend }));
    await dispatch(getBlogs(token));
    navigate("/");
  };

  return (
    <Layout>
      <h3 style={{ fontFamily: "sans-serif", textAlign: "center" }}>
        Create Blog
      </h3>
      <Box
        style={{ width: "40%", marginLeft: "30%" }}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            style={{ width: "100%" }}
            required
            id="outlined-required"
            label="Blog Title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            style={{ width: "100%" }}
            required
            id="outlined-multiline-flexible"
            label="Blog"
            multiline
            maxRows={4}
            defaultValue={blog}
            onChange={(e) => setBlog(e.target.value)}
          />
          <MuiFileInput
            style={{ marginBottom: "15px", marginTop: "15px", width: "100%" }}
            placeholder="Uplod Image"
            InputProps={{
              inputProps: {
                accept: "image/*",
              },
              startAdornment: <AddPhotoAlternateOutlinedIcon />,
            }}
            value={blogImage}
            onChange={(e) => handleImage(e)}
          />
          <Button
            style={{
              width: "100%",
              color: "white",
              backgroundColor: "black",
              marginLeft: "8px",
            }}
            onClick={handleSubmit}
          >
            Create
          </Button>
        </div>
      </Box>
    </Layout>
  );
};

export default Blog;
