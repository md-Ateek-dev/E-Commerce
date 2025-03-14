import React from 'react';
import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import Footer from './Footer .jsx'
function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  const navItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Services", path: "/services" },
    { text: "Contact", path: "/contact" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* Hamburger Icon for Mobile */}
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { md: "none" } }} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>

          <div>
            <Button sx={{ margin: 2 }} color='success' variant="contained" onClick={() => navigate("/Signup")}>
              SignUP
            </Button>

            <Button sx={{ margin: 2 }} color='error' variant="contained" direction="row" onClick={() => navigate("/Login")}>
              Login
            </Button>
          </div>

          {/* Desktop Menu */}
          <div style={{ display: "flex" }}>
            {navItems.map((item) => (
              <Button key={item.text} color="inherit" component={Link} to={item.path} sx={{ display: { xs: "none", md: "block" } }}>
                {item.text}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* <div className='bg-red-500 text-white text-5xl'>
        <img src="https://images.unsplash.com/photo-1737804719078-a7ad65eee2d5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div> */}

      {/* Render Footer Component */}
      <Footer />
    </>
  );
}

export default Home;