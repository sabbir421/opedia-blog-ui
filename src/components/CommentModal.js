import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useDispatch, useSelector } from "react-redux";
import { getComment } from "../state/comment/commentSlice";

const CommentModal = ({ open, onClose, blog }) => {
  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userData);
  const { token} = userReducer;
  const { comments } = useSelector((state) => state.commentData);
  useEffect(() => {
    dispatch(getComment({ token, blogId: blog?._id }));
  }, [dispatch, token, blog?._id]);

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
        ></DialogTitle>

        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid item xs={2} sm={12} md={12} key={blog?._id}>
            <Card sx={{ maxWidth: 650 }}>
              <CardMedia
                style={{ width: "450px", height: "150px" }}
                image={blog?.blogImage}
                title={blog?.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog?.blog}
                </Typography>
              </CardContent>

              <div style={{marginLeft:"10px"}}>
                <h6>Comments</h6>
                {comments.map((comment) => (
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Person2OutlinedIcon />
                      <Typography>{comment?.commentByName}</Typography>
                    </div>
                    <Typography>{comment?.comment}</Typography>
                  </div>
                ))}
              </div>
            </Card>
          </Grid>
        </Box>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CommentModal;
