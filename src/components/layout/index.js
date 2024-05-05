import React from "react";
import Navbar from "../Navbar";
import { Box, Grid } from "@mui/material";
import "@fontsource/dm-sans";

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
        <Box>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default Layout;
