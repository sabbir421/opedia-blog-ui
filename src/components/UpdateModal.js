import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import { MuiFileInput } from "mui-file-input";
import { getBlogs, updateBlog } from "../state/blog/blogSlice";

const UpdateModal = ({
  open,
  onClose,
  blogData,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const userReducer = useSelector((state) => state.userData);
  const { token, loginUser } = userReducer;
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
 
  const handleSubmit = async() => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    formDataToSend.append("blog", blog);
    formDataToSend.append("ownerId", loginUser?._id);
    formDataToSend.append("ownerName", loginUser?.userName);
    formDataToSend.append("blogImage", blogImage);

   await dispatch(updateBlog({blogId:blogData?._id, token, data: formDataToSend }));
   await dispatch(getBlogs(token));
   await onClose()
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ color: "black", textAlign: "center" }}
          id="alert-dialog-title"
        >
          Update Bank Account
        </DialogTitle>
        <div style={{ width: "40%", marginLeft: "30%" }}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Blog Title"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                required
                id="outlined-multiline-flexible"
                label="Blog"
                multiline
                maxRows={4}
                defaultValue={blog}
                onChange={(e) => setBlog(e.target.value)}
              />
              <MuiFileInput
                style={{ marginBottom: "15px", marginTop: "15px" }}
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
            </div>
          </Box>
          <Button
            style={{
              color: "white",
              backgroundColor: "black",
              marginLeft: "10px",
            }}
            onClick={handleSubmit}
            autoFocus
          >
            Update
          </Button>
        </div>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default UpdateModal;
