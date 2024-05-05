import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/signup/authSlice";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const {loginUser}=useSelector((state)=>state.userData)
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My-Blog
          </Typography>
          <NavLink
            to="/blog"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "50%",
            }}
          >
            CREATE BLOG
          </NavLink>
          <Typography style={{marginRight:"10%"}}>Welcome back {loginUser?.userName}</Typography>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
