import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "../state/blog/blogSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/layout";
import UpdateModal from "../components/UpdateModal";
import { createComment } from "../state/comment/commentSlice";
import CommentModal from "../components/CommentModal";

const BlogPage = () => {
  const dispatch = useDispatch();
  const [blogDetails, setBlogDetails] = useState(null);
  const { data: blogs } = useSelector((state) => state.blogData);
  const userReducer = useSelector((state) => state.userData);
  const { token, loginUser } = userReducer;
  const [isUpdateBankModalOpen, setIsUpdateBankModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const handleUpdateModal = (blog) => {
    setBlogDetails(blog);
    setIsUpdateBankModalOpen(true);
  };
  const handleCloseUpdateModal = () => {
    setIsUpdateBankModalOpen(false);
  };
  const handleCommentModal = (blog) => {
    setBlogDetails(blog);
    setIsCommentModalOpen(true);
  };
  const handleCommentCloseModal = () => {
    setIsCommentModalOpen(false);
  };
  const handleDelete = async (blog) => {
    await dispatch(deleteBlog({ blogId: blog?._id, token }));
    await dispatch(getBlogs(token));
  };
  useEffect(() => {
    dispatch(getBlogs(token));
  }, [dispatch, token]);
  const handleComment = (blog) => {
    const data = {
      blogId: blog?._id,
      comment: comment,
      commentByName: loginUser?.userName,
      commentById: loginUser?._id,
    };
    dispatch(createComment({ token, data }));
  };
  return (
    <>
      <Layout>
        <Box sx={{ flexGrow: 1, m: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {blogs?.map((blog) => (
              <Grid item xs={2} sm={4} md={4} key={blog?._id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={blog?.blogImage}
                    title={blog?.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {blog?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog?.blog.split(" ").slice(0, 10).join(" ")}{" "}
                      <button
                        onClick={() => handleCommentModal(blog)}
                        style={{ border: 0 }}
                      >
                        see more
                      </button>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {loginUser?._id === blog?.ownerId ? (
                      <>
                        <Button
                          size="small"
                          onClick={() => handleUpdateModal(blog)}
                        >
                          Update
                        </Button>
                        <Button onClick={() => handleDelete(blog)} size="small">
                          Delete
                        </Button>
                        :
                      </>
                    ) : (
                      ""
                    )}
                    <Button
                      onClick={() => handleCommentModal(blog)}
                      size="small"
                    >
                      Comment
                    </Button>
                  </CardActions>
                  <div style={{ display: "flex" }}>
                    <TextField
                      style={{
                        width: "60%",
                        marginBottom: "10px",
                        marginLeft: "3%",
                      }}
                      required
                      id="outlined-multiline-flexible"
                      placeholder="Write your comment"
                      multiline
                      maxRows={4}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                      onClick={() => handleComment(blog)}
                      style={{
                        marginLeft: "3%",
                        color: "white",
                        backgroundColor: "DodgerBlue",
                        height: "40px",
                        marginTop: "8px",
                      }}
                    >
                      send
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
      <UpdateModal
        blogData={blogDetails}
        open={isUpdateBankModalOpen}
        onClose={handleCloseUpdateModal}
      />
      <CommentModal
        blog={blogDetails}
        open={isCommentModalOpen}
        onClose={handleCommentCloseModal}
      />
    </>
  );
};

export default BlogPage;
